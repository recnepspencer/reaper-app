import React from "react";
import classNames from "classnames";

export type ModalProps = {
    children: React.ReactNode;
    title: string;
    variant?: "primary" | "secondary";
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, title, variant = "primary", onClose }) => {
    const modalClass = classNames("bg-white", {
        "bg-primary-button": variant === "primary",
        "bg-secondary-button": variant === "secondary",
    });
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div className={`w-1/3 p-4 rounded-lg ${modalClass}`}/>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
        </div>);
};

export default Modal;