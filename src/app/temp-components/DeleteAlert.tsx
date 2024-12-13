"use client";

import React from "react";
import Modal from "./Modal";
import Button from "./Button";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>; // Update to handle async delete
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await onDelete(); // Perform the delete action
      onClose(); // Close the alert after deletion
    } catch (error) {
      console.error("Error deleting goal:", error);
      // Optionally handle errors here (e.g., show a message)
    }
  };

  return isOpen ? (
    <Modal title="Delete Goal" onClose={onClose}>
      <p className="text-primary-text">
        Are you sure you want to delete this goal? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-4 mt-4">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </div>
    </Modal>
  ) : null;
};

export default DeleteAlert;
