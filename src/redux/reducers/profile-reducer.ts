import {PhotosType, PostType, ProfileType} from '../../types/types';
import {profileAPI} from '../../api/profile-api';
import {BaseThunkType, InferActionsType} from '../store/redux-store';

const ADD_POST = 'ideas-network/profile/ADD_POST';
const DELETE_POST = 'ideas-network/profile/DELETE_POST';
const SET_USER_PROFILE = 'ideas-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'ideas-network/profile/SET_STATUS';
const SET_PROFILE_PHOTO = 'ideas-network/profile/SET_PROFILE_PHOTO';
const SET_ERRORS = 'ideas-network/profile/SET_ERRORS';

const initialState = {
    profile: null as ProfileType | null,
    userStatus: '',
    posts: [
        {id: 1, postText: 'This is my first post!', likesCount: 36},
        {id: 2, postText: 'Another post', likesCount: 68},
        {id: 3, postText: 'I have an idea', likesCount: 26}
    ] as Array<PostType>,
    errors: [] as Array<string>
};

let newPost;

// Profile Reducer
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            newPost = {
                id: state.posts.length + 1,
                postText: action.newPostText,
                likesCount: 46
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                userStatus: action.userStatus
            };
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
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
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setStatus: (userStatus: string) => ({type: SET_STATUS, userStatus} as const),
    setProfilePhotos: (photos: PhotosType) => ({type: SET_PROFILE_PHOTO, photos} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    setErrors: (errors: Array<string>) => ({type: SET_ERRORS, errors} as const)
};

// Thunks
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
};

export const updateStatus = (newStatus: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(newStatus);
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(newStatus));
        } else {
            console.error(response.data.messages?.[0]);
        }
    } catch (e) {
        console.log(e);
    }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.setProfilePhotos(data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
        if (userId !== null) {
            await dispatch(getProfile(userId));
        } else {
            throw new Error('userId can\'t be null');
        }
    } else {
        console.log(response.messages);
        dispatch(actions.setErrors(response.messages));
        return Promise.reject(response.messages?.[0]);
    }
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
