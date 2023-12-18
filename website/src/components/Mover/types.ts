import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface TMoverProps extends  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    onClose: () => void;
    isOpened: boolean;
    children: ReactNode;
    title?: string
}
