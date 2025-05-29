import React, { useState, useEffect } from 'react';
import {
  Stack,
  Label,
  TagPicker,
  ITag,
  PrimaryButton,
  List,
  Text,
  Spinner,
} from '@fluentui/react';
import { getDishSuggestions } from '../../api/dishes';
import './DishSuggester.css';

export const DishSuggester: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<ITag[]>([]);
  const [suggestedDishes, setSuggestedDishes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      // In a real app, this would come from an API endpoint
      const ingredients = [
        'Rice flour',
        'coconut',
        'jaggery',
        'banana',
        'ghee',
        'maida flour',
        'yogurt',
        'oil',
        'sugar',
        'chicken',
      ];
      setAllIngredients(ingredients);
    };

    fetchIngredients();
  }, []);

  const handleGetSuggestions = async () => {
    if (selectedIngredients.length === 0) return;

    setLoading(true);
    try {
      const ingredients = selectedIngredients.map((tag) => tag.name);
      const suggestions = await getDishSuggestions({ ingredients });
      setSuggestedDishes(suggestions.map((dish) => dish.name));
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dish-suggester-container">
      <Stack tokens={{ childrenGap: 15 }}>
        <Label>Select available ingredients:</Label>
        <TagPicker
          selectedItems={selectedIngredients}
          onResolveSuggestions={(filter) =>
            allIngredients
              .filter((ing) => ing.toLowerCase().includes(filter.toLowerCase()))
              .map((ing) => ({ key: ing, name: ing }))
          }
          onChange={(items) => setSelectedIngredients(items || [])}
          className="ingredient-picker"
        />

        <PrimaryButton
          text="Find Matching Dishes"
          onClick={handleGetSuggestions}
          disabled={selectedIngredients.length === 0}
          className="suggest-button"
        />

        {loading && <Spinner label="Finding suggestions..." />}

        {suggestedDishes.length > 0 && (
          <div className="suggestions-list">
            <Text variant="mediumPlus">You can make these dishes:</Text>
            <List
              items={suggestedDishes}
              onRenderCell={(item) => <Text className="suggestion-item">{item}</Text>}
            />
          </div>
        )}
      </Stack>
    </div>
  );
};