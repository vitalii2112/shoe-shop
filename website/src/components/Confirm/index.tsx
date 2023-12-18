import {FC} from 'react';
import styles from './Confirm.module.scss';
import {confirmable, ConfirmDialogProps, createConfirmation} from "react-confirm";
import {TConfirmProps} from "@/components/Confirm/types";
import Modal from "@/components/Modal";
import cn from "classnames";

const Confirm: FC<ConfirmDialogProps<TConfirmProps, boolean>> = ({title, text, okLabel, cancelLabel, show, proceed}) => {
    return (
        <Modal opened={show} onCloseModal={() => proceed(false)} className={styles.confirm}>
            {title && <h4>{title}</h4>}
            <p className={cn({[styles.noTitle]: !title})}>{text}</p>
            <div className="btn__wrapper">
                <button className="btn-common" onClick={() => proceed(true)}>{okLabel || 'Да'}</button>
                <button className="btn-common cancel"
                        onClick={() => proceed(false)}>{cancelLabel || 'Нет'}</button>
            </div>
        </Modal>
    );
};

const defaultConfirmation = createConfirmation(confirmable(Confirm));

export default function confirmation(text: string, title?: string, options?: Omit<TConfirmProps, 'title' | 'text'>) {
    return defaultConfirmation({text, title, ...options});
}

