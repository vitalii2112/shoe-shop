import React, {FC, KeyboardEvent, ChangeEvent, useState} from 'react';
import styles from './SearchField.module.scss';
import {SearchFieldProps} from './types';
import {ReactComponent as SearchSVG} from '../../assets/svg/search.svg';
import {ReactComponent as CloseSVG} from '../../assets/svg/close.svg';
import cn from 'classnames';

const SearchField: FC<SearchFieldProps> = ({
                                               placeholder,
                                               initValue = '',
                                               onSearch,
                                               analogs,
                                               setAnalogs,
                                               name,
                                               className,
                                               searchRef,
                                               ...props
                                           }) => {

    const [searchValue, setSearchValue] = useState(initValue)
    const resetHandler = () => {
        setSearchValue('')
        onSearch('')
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchValue);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={cn(styles.search, className)} {...props}>
            <input
                type="text"
                placeholder={placeholder}
                onKeyDown={keyDownHandler}
                ref={searchRef}
                autoComplete="on"
                name={name ?? 'shoe_store_search'}
                id={name ?? 'shoe_store_search'}
                onChange={handleChange}
                value={searchValue}
            />
            {searchValue && <CloseSVG className={styles.closeBtn} onClick={resetHandler}/>}
            <button type="button" onClick={() => onSearch(searchValue)}>
                <SearchSVG/>
            </button>
        </div>
    );
};

export default SearchField;
