import {FC} from 'react';
import styles from './Mover.module.scss';
import cn from "classnames";
import {TMoverProps} from "@/components/Mover/types";
import {ReactComponent as CloseSVG} from "@/assets/svg/remove.svg";

const Mover: FC<TMoverProps> = ({onClose, isOpened,title, children, className, ...props}) => {
    return (
        <div className={cn(styles.overlay, {[styles.overlayVisible]: isOpened})}>
            <div className={cn(styles.mover, className)} {...props}>
                <CloseSVG className={styles.moverClose} onClick={onClose}/>
                {title && <h2 className={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Mover;
