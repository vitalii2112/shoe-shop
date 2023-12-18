import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface TitleBackProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    children?: ReactNode;
}