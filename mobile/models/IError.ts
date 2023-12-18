export enum ErrorType {
    TooShort = 'too_short',
    TooLong = 'too_long',
    Blank = 'blank',
    Taken = 'taken'
}

export interface ICommonError {
    error: ErrorType;
}

export interface IErrorLength extends ICommonError {
    count: number;
}

export interface TErrorTaken extends ICommonError {
    value: string;
}

export interface IErrorAuth {
    first_name: IErrorLength[];
    last_name: IErrorLength[];
    password: IErrorLength[];
    email: TErrorTaken[];
}
