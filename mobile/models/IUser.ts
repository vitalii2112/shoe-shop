export interface IUser extends Omit<IUserRegister, "password"> {
    id: number
    role: 'admin' | 'user'
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    first_name: string
    last_name: string
}


export interface IUserUpdate extends Omit<IUser, "id"> {}
