import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, PrimaryButton, Spinner } from '@fluentui/react';
import { DishDetails } from '../../components/DishDetails/DishDetails';
import { Header } from '../../components/Header/Header';
import { getDishByName } from '../../api/dishes';
import { Dish } from '../../api/types';
import './DishDetail.css';

export const DishDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        if (!name) {
          throw new Error('No dish name provided');
        }

        const response = await getDishByName(decodeURIComponent(name));
        setDish(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dish');
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [name]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner label="Loading dish details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Text variant="large">{error}</Text>
        <PrimaryButton text="Back to All Dishes" onClick={handleBack} />
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="error-container">
        <Text variant="large">Dish not found.</Text>
        <PrimaryButton text="Back to All Dishes" onClick={handleBack} />
      </div>
    );
  }

  return (
    <div className="dish-detail-page">
      <Header />
      <div className="dish-detail-content">
        <PrimaryButton
          text="Back to All Dishes"
          onClick={handleBack}
          className="back-button"
        />
        <DishDetails dish={dish} />
      </div>
    </div>
  );
};
