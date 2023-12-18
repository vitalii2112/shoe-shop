import {FC, useCallback, useEffect, useState} from 'react';
import styles from './AuthModal.module.scss';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TAuthModalProps} from './types';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import cn from 'classnames';
import {IUserLogin, IUserRegister} from "@/models/IUser";
import {useActions} from "@/hooks/useActions";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import {useAppSelector} from "@/hooks/useAppSelector";
import {EStatus} from "@/store/user/types";

const AuthModal: FC<TAuthModalProps> = ({open, onClose}) => {
    const [activeTab, setActiveTab] = useState(0);
    const {status} = useAppSelector(state => state.user)
    const {login, register} = useActions()

    const {
        register: loginFormRegister,
        handleSubmit: loginFormHandleSubmit,
        formState: {errors: loginFormErrors},
        reset: loginFormReset,
        clearErrors: loginFormClearErrors,
    } = useForm<IUserLogin>();

    const {
        register: createFormRegister,
        handleSubmit: createFromHandleSubmit,
        formState: {errors: createFromErrors},
        reset: createFromReset,
        clearErrors: createFromClearErrors,
    } = useForm<IUserRegister>();

    const onCloseModal = useCallback(() => {
        onClose();
        loginFormReset();
        loginFormClearErrors();
        createFromReset();
        createFromClearErrors();
        setActiveTab(0)
    }, [createFromClearErrors, createFromReset, loginFormClearErrors, loginFormReset, onClose]);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    const onSubmitLoginForm: SubmitHandler<IUserLogin> = login;
    const onSubmitCreateForm: SubmitHandler<IUserRegister> = register;

    useEffect(() => {
        if (status === EStatus.SUCCESS) {
            onCloseModal();
        }
    }, [status, onCloseModal]);

    useEffect(() => {
        setActiveTab(0)
    }, [open])

    return (
        <Modal onCloseModal={onCloseModal} opened={open} key={open ? 'open' : 'closed'}>
            {status === EStatus.LOADING && <Loading absolute modal/>}
            <Tabs className={styles.modal} selectedIndex={activeTab} onSelect={handleTabChange}>
                <TabList className={styles.modalTabList}>
                    <Tab className={styles.modalTab} selectedClassName={styles.selected}>Авторизация</Tab>
                    <Tab className={styles.modalTab}
                         selectedClassName={styles.selected}>Регистрация</Tab>
                </TabList>

                <TabPanel className={styles.modalTabPanel} selectedClassName={styles.selected}>
                    <form onSubmit={loginFormHandleSubmit(onSubmitLoginForm)}>
                        <div className={styles.formControl}>
                            <label htmlFor="login_email">Email</label>
                            <input
                                type="email"
                                className={cn({[styles.invalid]: loginFormErrors.email})}
                                placeholder="example@email.com"
                                id="login_email"
                                {...loginFormRegister('email', {required: 'Введите email'})}
                            />
                            {loginFormErrors.email && <span>{loginFormErrors.email.message}</span>}
                        </div>

                        <div className={styles.formControl}>
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                className={cn({[styles.invalid]: loginFormErrors.password})}
                                placeholder="password123"
                                id="password"
                                {...loginFormRegister('password', {
                                    required: "Введите пароль",
                                    minLength: {value: 6, message: 'Минимальная длина 6 символов'}
                                })}
                            />
                            {loginFormErrors.password && <span>{loginFormErrors.password.message}</span>}
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button>Войти</button>
                        </div>
                    </form>
                </TabPanel>

                <TabPanel className={styles.modalTabPanel} selectedClassName={styles.selected}>
                    <form onSubmit={createFromHandleSubmit(onSubmitCreateForm)}>
                        <div className={styles.formControl}>
                            <label htmlFor="register_firstName">Имя</label>
                            <input
                                type="text"
                                className={cn({[styles.invalid]: createFromErrors.first_name})}
                                placeholder="Павел"
                                id="register_firstName"
                                {...createFormRegister('first_name', {
                                    required: "Введите имя",
                                    minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                                    maxLength: {value: 50, message: 'Максимальная длина 50 символов'}
                                })}
                            />
                            {createFromErrors.first_name && <span>{createFromErrors.first_name.message}</span>}
                        </div>

                        <div className={styles.formControl}>
                            <label htmlFor="register_lastName">Фамилия</label>
                            <input
                                type="text"
                                className={cn({[styles.invalid]: createFromErrors.last_name})}
                                placeholder="Быков"
                                id="register_lastName"
                                {...createFormRegister('last_name', {
                                    required: "Введите фамилию",
                                    minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                                    maxLength: {value: 50, message: 'Максимальная длина 50 символов'}
                                })}
                            />
                            {createFromErrors.last_name && <span>{createFromErrors.last_name.message}</span>}
                        </div>

                        <div className={styles.formControl}>
                            <label htmlFor="register_email">Email</label>
                            <input
                                type="email"
                                className={cn({[styles.invalid]: createFromErrors.email})}
                                placeholder="example@email.com"
                                id="register_email"
                                {...createFormRegister('email', {required: "Введите email"})}
                            />
                            {createFromErrors.email && <span>{createFromErrors.email.message}</span>}
                        </div>

                        <div className={styles.formControl}>
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                className={cn({[styles.invalid]: createFromErrors.password})}
                                placeholder="P@ssword123"
                                id="password"
                                {...createFormRegister('password', {
                                    required: "Введите пароль",
                                    minLength: {value: 6, message: 'Минимальная длина 6 символов'},
                                })}
                            />
                            {createFromErrors.password && <span>{createFromErrors.password.message}</span>}
                        </div>
                        <div className={styles.buttonWrapper}>
                            <button>Зарегистрироваться</button>
                        </div>
                    </form>
                </TabPanel>
            </Tabs>
        </Modal>
    );
};

export default AuthModal;
