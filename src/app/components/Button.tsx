'use client'
import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode; // Accepts children instead of label
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  children, // Now using children
}) => {
  const baseStyles = 'inline-block px-4 py-2 rounded-lg font-bold text-button transition duration-200 ease-in-out';

  const variantClasses = {
    primary: 'bg-primary-button text-white hover:bg-primary-button-hover active:bg-white active:text-primary-button',
    secondary: 'bg-secondary-button text-white hover:bg-secondary-button-hover active:bg-white active:text-secondary-button',
    danger: 'bg-error-red text-white hover:bg-error-hover active:bg-white-smoke active:text-error-red',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantClasses[variant]} ${className}`}
    >
      {children} {/* This will display whatever is passed between the Button tags */}
    </button>
  );
};

export default Button;

//im build a react component. i have a details button that is the ... looking kind. when i click it, i want there to be a dropdown that says edit and one that says delete. 