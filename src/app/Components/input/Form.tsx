import React from "react";
import TextInput from "./TextInput";

export interface FormProps {
    children: React.ReactNode; 
    onSubmit: () => void;
    variant?: "primary" | "secondary";    
}
const Form: React.FC = (children, onSubmit, variant = "primary") => {
    return (
        <div>
            <TextInput label="First Name" value="" onChange={() => {}} />
            <TextInput label="Last Name" value="" onChange={() => {}} />
        </div>
    );
}