import React, {FC, useEffect, useLayoutEffect, useRef} from 'react';
import styles from './Modal.module.scss';
import {ModalType} from './types';
import {motion, AnimatePresence} from 'framer-motion';
import {ReactComponent as CloseSVG} from "@/assets/svg/close.svg";
import cn from 'classnames';

const Modal: FC<ModalType> = ({onCloseModal, opened, children, className}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<SVGSVGElement>(null);
    const modalChecker = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseModal();
            }
        };
        const handleCheck = (e: MouseEvent) => {
            if (e.target === modalRef.current || e.target === closeRef.current || e.target === closeRef.current?.firstChild) {
                modalChecker.current = true;
            }
        };
        const handleOpened = (e: MouseEvent) => {
            if (e.target === modalRef.current || e.target === closeRef.current || e.target === closeRef.current?.firstChild) {
                if (modalChecker.current) {
                    modalChecker.current = false;
                    onCloseModal();
                }
            }
        };


        document.body.addEventListener('mousedown', handleCheck);
        document.body.addEventListener('mouseup', handleOpened);
        document.body.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.removeEventListener('mousedown', handleCheck);
            document.body.removeEventListener('mouseup', handleOpened);
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseModal]);

    useLayoutEffect(() => {
        if (opened)
            document.documentElement.classList.add(styles.noScroll);
        else
            document.documentElement.classList.remove(styles.noScroll);
        return () => {
            document.documentElement.classList.remove(styles.noScroll);
        };
    }, [opened])


    return (
        <AnimatePresence>
            {opened &&
                <motion.div className={styles.modalBlock} ref={modalRef}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}>
                    <motion.div className={cn(styles.modal, className)}
                                initial={{transform: 'translate(-50%,-45%)'}}
                                animate={{transform: 'translate(-50%,-50%)'}}
                                exit={{transform: 'translate(-50%,-45%)'}}>
                        <CloseSVG className={styles.modalClose} ref={closeRef}/>
                        {children}
                    </motion.div>
                </motion.div>}
        </AnimatePresence>
    );
};

export default Modal;
