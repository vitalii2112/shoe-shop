import {FC} from 'react';
import {useNavigate, useParams} from "react-router";
import TitleBack from "@/components/TitleBack";
import {useUserProfile} from "@/pages/Users/pages/UserPage/useUserProfile";
import UserProfile from "@/components/UserProfile";
import Loading from "@/components/Loading";
import {IUserUpdate} from "@/models/IUser";

const UserPage: FC = () => {
    const params = useParams<{ id: string }>()

    const {
        isLoading,
        data: user,
        updateAsync,
        deleteAsync
    } = useUserProfile(params.id ? isNaN(+params.id) ? 0 : +params.id : 0)

    const navigate = useNavigate()

    const onUpdate = async (data: IUserUpdate) => {
        await updateAsync(data)
    }
    const onDelete = async () => {
        await deleteAsync()
        navigate('..')
    }
    return (
        <div className="layout">
            <TitleBack title={`Профиль ${user?.first_name || ''} ${user?.last_name || ''}`}/>
            {!user ? isLoading
                    ? <Loading/>
                    : <h3 style={{fontSize: 24, textAlign: 'center'}}>Пользователь не найден</h3>
                :
                <UserProfile user={user} onUpdate={onUpdate} onDelete={onDelete}/>}
        </div>
    );
};

export default UserPage;
