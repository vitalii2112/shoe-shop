import styles from './Table.module.scss';
import cn from 'classnames';
import {FC, useCallback, useState} from 'react';
import {ITable} from './types';
import {ReactComponent as CheckBoxCheckedSVG} from '../../assets/svg/checkbox-checked.svg';
import {ReactComponent as CheckBoxSVG} from '../../assets/svg/checkbox-unchecked.svg';

const Table: FC<ITable> = ({headers, selectable, cb, className, children, fontSize, ...props}) => {
    const [sortedBy, setSortedBy] = useState('')

    const sortHandler = useCallback((field: string) => {
        setSortedBy(prevState => prevState === field ? '' : field)
        cb?.(sortedBy === field ? undefined : field)
    }, [cb, sortedBy])

    return (
        <div className={cn(styles.table, className)} {...props} style={{fontSize: fontSize ? `${fontSize}px` : '16px'}} data-testid="table">
            <div className={styles.headers} style={{fontSize: fontSize ? `${fontSize + 2}px` : '18px'}} data-testid="table-headers">
                {selectable && <>
                    {selectable.show
                        ? <CheckBoxCheckedSVG onClick={selectable.unselectAll} data-testid="table-unselect"/>
                        : <CheckBoxSVG onClick={selectable.selectAll} data-testid="table-select"/>}
                </>
                }
                {headers.map(item => item && (typeof item === 'string'
                    ? <div key={item} data-testid="table-header">{item}</div> :
                    <div key={item.name} className={cn(styles.sortable, {[styles.sorted]: sortedBy === item.field})} data-testid="table-header"
                         onClick={() => sortHandler(item.field)}>{item.name}</div>))}
            </div>
            {children}
        </div>
    );
};

export default Table;
