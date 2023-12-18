import React, {ChangeEvent, FC} from 'react';
import styles from './FormInput.module.scss';
import cn from 'classnames';
import {FormInputProps} from './types';
import Select from "@/components/Select";

const FormInput: FC<FormInputProps> = ({
                                           label,
                                           placeholder,
                                           value,
                                           setValue,
                                           errorMessage,
                                           type,
                                           required = false,
                                           disabled = false,
                                           options,
                                           className,
                                           onKeyUp,
                                           ...props
                                       }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (type !== 'number') {
            setValue(inputValue);
        } else if (inputValue === '.') {
            setValue('0.');
        } else if (/^-?\d*\.?\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const renderInput = () => {
        if (type === 'select') {
            return (
                <Select
                    label={placeholder || ''}
                    selected={value?.toString()}
                    className={cn(styles.select, {[styles.error]: errorMessage})}
                    setSelected={(value) => setValue(value?.toString() || '')}
                    options={options}
                />
            );
        } else {
            const inputType = type === 'text' || type === 'number' ? 'text' : type;
            return (
                <input
                    type={inputType}
                    id={label}
                    className={cn({[styles.error]: errorMessage})}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                />
            );
        }
    };

    return (
        <div className={cn(styles.formInput, className)} {...props}>
            <label htmlFor={label}>
                {label}
                {required && <sup>*</sup>}
            </label>
            {renderInput()}
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
};

export default FormInput;
