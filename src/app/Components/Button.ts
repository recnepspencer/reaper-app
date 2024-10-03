// components/Button.tsx

import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, ...props }) => {
  const buttonClass = classNames(
    'px-2 py-2 font-bold text-button transition-colors duration-200',
    {
      // Primary button styles
      'bg-primary-button text-white hover:bg-primary-button-hover active:bg-white active:text-primary-button':
        variant === 'primary',

      // Secondary button styles
      'bg-secondary-button text-white hover:bg-secondary-button-hover active:bg-white active:text-secondary-button':
        variant === 'secondary',
    }
  );

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
