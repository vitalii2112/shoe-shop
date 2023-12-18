import styles from './Select.module.scss';
import {motion} from 'framer-motion';
import {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import cn from 'classnames';
import {SelectComponentType} from './types';
import {ReactComponent as SearchSVG} from '@/assets/svg/search.svg';

const Select: FC<SelectComponentType> = ({
                                             label,
                                             options,
                                             selected,
                                             setSelected,
                                             listClassname,
                                             openEnabled = true,
                                             searchEnable,
                                             searchPlaceholder,
                                             className,
                                             ...props
                                         }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const selectListRef = useRef<HTMLUListElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpened = (e: MouseEvent) => {
            const event = e as MouseEvent & { target: HTMLLIElement };
            if (e.target !== searchRef.current && event.target.parentElement !== searchRef.current && event.target.parentElement !== selectRef.current)
                setIsOpened(false);
        };
        document.body.addEventListener('click', handleOpened);
        return () => {
            document.body.removeEventListener('click', handleOpened);
        };
    }, []);
    useLayoutEffect(() => {
        if (isOpened && selectListRef.current) {
            selectListRef.current.scroll(0, 0);
        }

        if (isOpened && searchRef.current) {
            const input = searchRef.current.firstChild as HTMLInputElement;
            input.focus();
        } else {
            setSearchValue('');
        }
    }, [isOpened]);

    const labelString = !selected
        ? label
        : typeof selected === 'string'
            ? selected
            : Object.keys(selected).length > 0
                ? selected.label
                : label;
    return (
        <div className={cn(styles.select, className, {[styles.label]: selected === undefined})} ref={selectRef}
             {...props}>
            <div
                className={cn(styles.selectedHead, {[styles.open]: isOpened})}
                onClick={() => openEnabled && setIsOpened(prevState => !prevState)}>{labelString}</div>
            <motion.div transition={{ease: 'easeInOut', duration: 0.2}} className={styles.selectListContainer}
                        animate={{height: isOpened ? 'auto' : 0, marginTop: isOpened ? '5px' : '0px'}}>
                {searchEnable && <div className={styles.search} ref={searchRef}><input type="text" value={searchValue}
                                                                                       placeholder={searchPlaceholder}
                                                                                       onChange={(e) => setSearchValue(e.target.value)}/>
                    <SearchSVG/>
                </div>}
                <ul className={cn(styles.selectList, listClassname)}
                    ref={selectListRef}>
                    {typeof options === 'object'
                        && options?.map(item => {
                            if (typeof item === 'string')
                                if (searchValue === '')
                                    return <li key={item} className={styles.selectItem}
                                               onClick={() => setSelected(item)}>{item}</li>;
                                else
                                    return item.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 &&
                                        <li key={item} className={styles.selectItem}
                                            onClick={() => setSelected(item)}>{item}</li>;
                            else if (searchValue === '')
                                return <li key={item.value} className={styles.selectItem}
                                           onClick={() => setSelected(item)}>{item.label}</li>;
                            else
                                return item.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 &&
                                    <li key={item.value} className={styles.selectItem}
                                        onClick={() => setSelected(item)}>{item.label}</li>;
                        })}
                </ul>
            </motion.div>
        </div>
    );
};

export default Select;
