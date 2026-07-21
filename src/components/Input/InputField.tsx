import type { ReactNode } from 'react';
import { useId } from 'react';
import { Input } from './Input';
import type { InputProps } from './Input.types';
import { InputLabel } from './InputLabel';
import { InputHelperText } from './InputHelperText';
import { InputError } from './InputError';

interface InputFieldProps extends InputProps {
  label?: string;
  helperText?: ReactNode;
  error?: ReactNode;
}

export function InputField({
  label,
  helperText,
  error,
  id,
  required,
  ...inputProps
}: InputFieldProps) {
  const generatedId = useId();

  const inputId = id ?? generatedId;

  const helperId = `${inputId}-helper`;

  const errorId = `${inputId}-error`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className="space-y-1.5">
      {label && (
        <InputLabel htmlFor={inputId} required={required}>
          {label}
        </InputLabel>
      )}

      <Input
        {...inputProps}
        id={inputId}
        required={required}
        hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />

      {error ? (
        <InputError id={errorId}>{error}</InputError>
      ) : (
        helperText && (
          <InputHelperText id={helperId}>{helperText}</InputHelperText>
        )
      )}
    </div>
  );
}
