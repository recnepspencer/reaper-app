// Components/Message.tsx

import React from 'react';
import classNames from 'classnames';

export interface MessageProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

const Message: React.FC<MessageProps> = ({ children, variant = 'primary' }) => {
    const messageClass = classNames(
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

    return <div className={messageClass}>{children}</div>;
};

export default Message;