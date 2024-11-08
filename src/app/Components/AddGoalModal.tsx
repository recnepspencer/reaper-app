'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import TextInput from './input/TextInput';
import Button from './Button';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goalData: { title: string; description: string; type: GoalType }) => void;
}

type GoalType = 'YESNO' | 'TIMER' | 'COUNTER';

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onCreateGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<GoalType>('YESNO'); // Default goal type

  const handleCreateGoal = () => {
    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }

    onCreateGoal({ title, description, type });
    // Reset form fields
    setTitle('');
    setDescription('');
    setType('YESNO');
    onClose();
  };

  if (!isOpen) {
    return null; // Do not render the modal if it's not open
  }

  return (
    <Modal title="Create New Goal" variant="secondary" onClose={onClose}>
      <div className="space-y-4">
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        {/* Goal Type Selection */}
        <div>
          <label className="block text-white mb-1">Goal Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as GoalType)}
            className="w-full p-2 bg-dark-gray text-white rounded"
          >
            <option value="YESNO">Yes/No</option>
            <option value="TIMER">Timer</option>
            <option value="COUNTER">Counter</option>
          </select>
        </div>

        <Button variant="primary" onClick={handleCreateGoal}>
          Create Goal
        </Button>
      </div>
    </Modal>
  );
};

export default AddGoalModal;
