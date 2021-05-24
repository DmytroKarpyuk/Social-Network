import { authAPI } from "../../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERRORS = 'SET_ERRORS';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    errors: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            }
        default:
            return state;
    }
};

export const setAuthUserData = (userId, login, email, isAuth) => ({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } });
export const setErrors = (errors) => ({ type: SET_ERRORS, errors });

// Thunk creators
export const getAuthUserData = () => (dispatch) => {
    return authAPI.getMe().then(response => {
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
    });
};

export const logInUser = (email, password, rememberMe) => (dispatch) => {

    authAPI.logIn(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            dispatch(setErrors(response.data.messages));
        }
    });
};

export const logOutUser = () => (dispatch) => {
    authAPI.logOut().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
};

export default authReducer;