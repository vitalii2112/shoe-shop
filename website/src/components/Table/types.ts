import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ITable extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selectable?: {
        show: boolean
        selectAll: () => void
        unselectAll: () => void
    };
    headers: (string | ITableItem | null)[];
    fontSize?: number;
    cb?: (field: any) => void
    children: ReactNode;
}

export interface ITableItem {
    name: string
    field: string
}

