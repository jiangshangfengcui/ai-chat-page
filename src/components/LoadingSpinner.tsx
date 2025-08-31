import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '加载中...',
}) => {
  return (
    <div className="loading-spinner">
      <Loader2 size={32} className="spinner-icon" />
      <span className="loading-message">{message}</span>
    </div>
  );
};
