import React, {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface SearchFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    placeholder?: string
    initValue?: string
    // searchValue: string
    // setSearchValue: (value: string) => void
    onSearch: (value: string) => void
    analogs?: boolean
    setAnalogs?: React.Dispatch<React.SetStateAction<boolean>>
    name?: string
    searchRef?: React.Ref<HTMLInputElement>
}
