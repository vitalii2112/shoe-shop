import {IUser, IUserUpdate} from "@/models/IUser";

export type TUserProfileProps = {
    user: IUser
    onUpdate: (user: IUserUpdate) => void
    onDelete?: () => void
}
