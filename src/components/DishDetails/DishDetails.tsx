import React from 'react';
import { Stack, Text, Image } from '@fluentui/react';
import { Dish } from '../../api/types';
import './DishDetails.css';

interface DishDetailsProps {
  dish: Dish;
}

export const DishDetails: React.FC<DishDetailsProps> = ({ dish }) => {
  console.log(dish);
  return (
    <div className="dish-details-container">
      <Stack tokens={{ childrenGap: 20 }}>
        <Text variant="xxLarge" className="dish-name">
          {dish.name}
        </Text>

        <Stack tokens={{ childrenGap: 12 }} className="dish-info">
          <Text>
            <strong>Ingredients:</strong> {dish.ingredients}
          </Text>
          <Text>
            <strong>Diet:</strong>{' '}
            {dish.diet === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
          </Text>
          <Text>
            <strong>Preparation Time:</strong> {dish.prep_time} minutes
          </Text>
          <Text>
            <strong>Cooking Time:</strong> {dish.cook_time} minutes
          </Text>
          <Text>
            <strong>Flavor:</strong> {dish.flavor_profile}
          </Text>
          <Text>
            <strong>Course:</strong> {dish.course}
          </Text>
          <Text>
            <strong>State:</strong> {dish.state}
          </Text>
          <Text>
            <strong>Region:</strong> {dish.region}
          </Text>
        </Stack>
      </Stack>
    </div>
  );
};