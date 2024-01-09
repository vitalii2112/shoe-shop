import React, {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface SearchFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    placeholder?: string
    initValue?: string
    onSearch: (value: string) => void
    name?: string
    searchRef?: React.Ref<HTMLInputElement>
}
