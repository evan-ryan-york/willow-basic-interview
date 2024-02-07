import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface FormFieldProps {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  type?: string;
}

const FormField = ({ value, onChange, label, name, type }: FormFieldProps) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      sx={{ mt: 2 }}
      fullWidth
    />
  );
};

export default FormField;
