import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface SelectComponentType extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: string;
    openEnabled?: boolean;
    selected: TSelect | string | undefined;
    // setSelected: Dispatch<SetStateAction<{ value: string; label: string; } | undefined>> | Dispatch<SetStateAction<string>>;
    setSelected: (selected: TSelect | string | undefined) => void;
    listClassname?: string;
    options: TSelect[] | string[] | undefined;
    searchEnable?: boolean;
    searchPlaceholder?: string;
}

export type TSelect = {
    label: string
    value: string
}