import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="error-banner">
      <div className="error-content">
        <AlertCircle size={20} className="error-icon" />
        <span className="error-message">{message}</span>
      </div>
      <button onClick={onClose} className="error-close" title="关闭错误提示">
        <X size={16} />
      </button>
    </div>
  );
};
