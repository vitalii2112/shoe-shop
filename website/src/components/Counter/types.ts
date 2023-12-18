import {Dispatch, SetStateAction} from 'react';

export type TCounter = {
    value: number
    setValue: Dispatch<SetStateAction<number>>
}
