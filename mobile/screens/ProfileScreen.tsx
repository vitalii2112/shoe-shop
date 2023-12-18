import {FC} from 'react';
import {SubmitHandler} from "react-hook-form";
import {useAppSelector} from "../hooks/useAppSelector";
import {useActions} from "../hooks/useActions";
import {IUserUpdate} from "../models/IUser";
import Profile from "../components/Profile";
import {EStatus} from "../store/user/types";

const ProfileScreen: FC = () => {
    const {user, status} = useAppSelector(state => state.user)

    const {updateMe} = useActions()

    const onSubmit: SubmitHandler<IUserUpdate> = updateMe

    return (
        <Profile onSubmit={onSubmit} user={user} isLoading={status === EStatus.LOADING}/>
    );
};

export default ProfileScreen;
