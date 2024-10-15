import React from "react";
import classNames from "classnames";

export type ModalProps = {
    children: React.ReactNode;
    title: string;
    variant?: "primary" | "secondary";
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, title, variant = "primary", onClose }) => {
    const modalClass = classNames("bg-black", {
        "bg-primary-button": variant === "primary",
        "bg-secondary-button": variant === "secondary",
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay with onClick to close the modal */}
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md" onClick={onClose} />

            {/* Modal content */}
            <div className={`relative w-1/3 p-4 rounded-lg ${modalClass}`}>
                {/* Close button inside the modal */}
                <button onClick={onClose} className="absolute top-2 right-2">
                    X
                </button>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
