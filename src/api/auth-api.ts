import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from './api';

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userID: number
}

export const authAPI = {
    getMe() {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me')
            .then(res => res.data);
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(res => res.data);
    },
    logOut() {
        return instance.delete('auth/login')
            .then(res => res.data);
    }
};