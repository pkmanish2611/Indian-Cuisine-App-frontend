import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, SearchBox, Text, Image, PrimaryButton } from '@fluentui/react';
import { searchDishes } from '../../api/dishes';
import { isAuthenticated, logout } from '../../api/auth';
import './Header.css';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchDishes(searchQuery);
        setSearchResults(results.map((dish) => dish.name));
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (newValue: string) => {
    setSearchQuery(newValue);
    setShowResults(newValue.trim() !== '');
  };

  const handleResultClick = (dishName: string) => {
    navigate(`/dish/${encodeURIComponent(dishName)}`);
    setShowResults(false);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Image
            src="/logo.png"
            alt="Indian Cuisine App"
            width={40}
            height={40}
          />
          <Text variant="large" className="app-title">
            Indian Cuisine App
          </Text>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 20 }} verticalAlign="center">
          <div className="search-container">
            <SearchBox
              placeholder="Search dishes by name, ingredients, or region"
              value={searchQuery}
              onChange={(_, newValue) => handleSearch(newValue || '')}
              className="search-box"
            />

            {showResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <Text
                    key={index}
                    block
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    {result}
                  </Text>
                ))}
              </div>
            )}
          </div>

          {isLoggedIn && (
            <PrimaryButton
              text="Logout"
              onClick={handleLogout}
              className="logout-button"
            />
          )}
        </Stack>
      </Stack>
    </header>
  );
};