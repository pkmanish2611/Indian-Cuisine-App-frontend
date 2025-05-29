import { Spinner, SpinnerSize } from '@fluentui/react';
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = SpinnerSize.medium,
  label = 'Loading...',
}) => {
  return (
    <div className="loading-spinner">
      <Spinner size={size} label={label} />
    </div>
  );
};