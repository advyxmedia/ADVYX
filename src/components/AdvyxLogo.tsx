import React from 'react';

interface AdvyxLogoProps {
  variant?: 'wordmark' | 'badge' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDark?: boolean;
}

export const AdvyxLogo: React.FC<AdvyxLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap: Record<string, string> = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  const heightClass = sizeMap[size] || 'h-10';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="ADVYX"
        className={`${heightClass} w-auto object-contain shrink-0`}
      />
    </div>
  );
};