import {ChangeEvent, FC, useState} from 'react';
import styles from './FormUploadInput.module.scss';
import {TFormUploadInputProps} from "@/components/FormUploadInput/types";
import cn from "classnames";

const FormUploadInput: FC<TFormUploadInputProps> = ({errorMessage, onChange, isFileExist}) => {
    const [isUploaded, setIsUploaded] = useState(!!isFileExist)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file)
            onChange(file)

        setIsUploaded(!!file)
    }

    return (
        <div className={cn(styles.formControl, {[styles.error]: errorMessage})}>
            <label htmlFor="img">Фото<sup>*</sup></label>
            <div className={cn(styles.fileWrapper, {[styles.uploaded]: isUploaded})}>
                <label htmlFor="img">
                    <input type="file" id="img" accept="image/webp" onChange={changeHandler}/>
                </label>
            </div>
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
};

export default FormUploadInput;
