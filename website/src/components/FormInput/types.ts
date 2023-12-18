import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface FormInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: string;
    placeholder?: string;
    errorMessage?: string;
    value: string | number;
    setValue: (value: string | number) => void;
    type: 'text' | 'number' | 'select' | 'date' | 'password';
    required?: boolean;
    disabled?: boolean;
    options?: string[];
}
