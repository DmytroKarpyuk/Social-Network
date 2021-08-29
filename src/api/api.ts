import axios from 'axios';
import {UserType} from '../types/types';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '7ff94c5a-c84e-4c38-842c-4cbd86a44ef7'},
    withCredentials: true
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
