'use client';
import React from "react";
import Button from "../Button";

export interface FormProps {
    children: React.ReactNode; 
    onSubmit: () => void;
    variant?:"primary" | "secondary" | "danger" | undefined;  
}
const Form: React.FC<FormProps> = ({ children, onSubmit, variant = "primary" }) => {
    return (
        <div>
            {children}
            <Button onClick={onSubmit} variant={variant}>Submit</Button>
        </div>
    );
}

export default Form;