import {IUser} from "@/models/IUser";

export type UserSliceType = {
    status: EStatus;
    isAuth: boolean;
    user?: IUser;
}

export enum EStatus {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}
