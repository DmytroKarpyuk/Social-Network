import {ResultCodeEnum, ResultCodeForCaptchaEnum} from '../../api/api';
import {BaseThunkType, InferActionsType} from '../store/redux-store';
import {authAPI} from '../../api/auth-api';
import {securityAPI} from '../../api/security-api';

const SET_USER_DATA = 'ideas-network/auth/SET_USER_DATA';
const SET_ERRORS = 'ideas-network/auth/SET_ERRORS';
const GET_CAPTCHA_URL_SUCCESS = 'ideas-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    errors: [] as Array<string>,
    captchaUrl: null as string | null
};

// Auth Reducer
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};

// Actions
export const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, payload: {userId, login, email, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const),
    setErrors: (errors: Array<string>) => ({type: SET_ERRORS, errors} as const)
};

// Thunks
export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.getMe();

        if (data.resultCode === ResultCodeEnum.Success) {
            const {id, login, email} = data.data;
            dispatch(actions.setAuthUserData(id, login, email, true));
        }
    };
};

export const logInUser = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.logIn(email, password, rememberMe, captcha);

        if (data.resultCode === ResultCodeEnum.Success) {
            await dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                await dispatch(getCaptchaUrl());
            }
            dispatch(actions.setErrors(data.messages));
        }
    };
};

export const logOutUser = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.logOut();
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    };
};

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    };
};

export default authReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
