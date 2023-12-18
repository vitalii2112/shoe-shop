import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ModalType extends  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    /**
     * onCloseModal - callback, который вызывается после закрытия*/
    onCloseModal: () => void;
    /**
     * opened - принимает boolean значение для отображения модального окна*/
    opened: boolean;
    /**
     * children - тело модального окна*/
    children: ReactNode;
}