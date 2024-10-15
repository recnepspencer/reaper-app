import React from 'react';
import { TextField } from '@mui/material';

const TextInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      InputProps={{
        style: {
          backgroundColor: '#1E1E1E',
          borderColor: '#F5F5F5',
          color: '#F5F5F5',
        },
      }}
      InputLabelProps={{
        style: {
          color: '#F5F5F5',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#F5F5F5',
          },
          '&:hover fieldset': {
            borderColor: '#F5F5F5',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#F5F5F5',
          },
        },
      }}
    />
  );
};

export default TextInput;
