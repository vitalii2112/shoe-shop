import {FC} from 'react';
import UserProfile from "@/components/UserProfile";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useActions} from "@/hooks/useActions";

const Profile: FC = () => {
    const {user} = useAppSelector(state => state.user)
    const {updateMe} = useActions()

    return (
        <div className="layout">
            <h1>Профиль</h1>
            {user && <UserProfile user={user} onUpdate={updateMe}/>}
        </div>
    );
};

export default Profile;
