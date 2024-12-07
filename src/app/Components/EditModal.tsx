"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { TextField, MenuItem } from "@mui/material";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditGoal: (
    goalId: number,
    updatedData: { title: string; description: string; type: string }
  ) => void;
  goal: {
    id: number;
    title: string;
    description: string;
    type: string;
  };
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onEditGoal,
  goal,
}) => {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [type, setType] = useState(goal.type);

  const handleSubmit = () => {
    onEditGoal(goal.id, { title, description, type });
    onClose();
  };

  return isOpen ? (
    <Modal title="Edit Goal" onClose={onClose}>
      <div className="space-y-6">
        {/* Title Input */}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          InputProps={{
            style: { backgroundColor: "#1E1E1E", color: "#F5F5F5" },
          }}
          InputLabelProps={{ style: { color: "#F5F5F5" } }}
        />

        {/* Description Input */}
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            style: { backgroundColor: "#1E1E1E", color: "#F5F5F5" },
          }}
          InputLabelProps={{ style: { color: "#F5F5F5" } }}
        />

        {/* Type Selector */}
        <TextField
          fullWidth
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          variant="outlined"
          InputProps={{
            style: { backgroundColor: "#1E1E1E", color: "#F5F5F5" },
          }}
          InputLabelProps={{ style: { color: "#F5F5F5" } }}
        >
          <MenuItem value="YESNO">Yes/No</MenuItem>
          <MenuItem value="COUNTER">Counter</MenuItem>
          <MenuItem value="TIMER">Timer</MenuItem>
        </TextField>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} variant="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default EditModal;
