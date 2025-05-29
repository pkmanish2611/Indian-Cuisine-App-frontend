import React from 'react';
import { Stack } from '@fluentui/react';
import { Header } from '../../components/Header/Header';
import { DishSuggester } from '../../components/DishSuggester/DishSuggester';
import { DishesList } from '../../components/DishesList/DishesList';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="page-content">
        <Stack tokens={{ childrenGap: 30 }}>
          <DishSuggester />
          <DishesList />
        </Stack>
      </div>
    </div>
  );
};