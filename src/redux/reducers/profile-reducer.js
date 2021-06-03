import {profileAPI} from "../../api/api";

const ADD_POST = 'ideas-network/profile/ADD_POST';
const DELETE_POST = 'ideas-network/profile/DELETE_POST';
const SET_USER_PROFILE = 'ideas-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'ideas-network/profile/SET_STATUS';

let initialState = {
    userProfile: null,
    userStatus: '',
    posts: [
        {id: 1, postText: 'This is my first post!', likesCount: 36},
        {id: 2, postText: 'Another post', likesCount: 68},
        {id: 3, postText: 'I have an idea', likesCount: 26}
    ]
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                postText: action.newPostBody,
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
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_STATUS:
            return {
                ...state,
                userStatus: action.userStatus
            }
        default:
            return state;
    }
};

export const addPost = (newPostBody) => ({type: ADD_POST, newPostBody});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setStatus = (userStatus) => ({type: SET_STATUS, userStatus});

// Thunks
export const getProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
};

export const updateStatus = (newStatus) => async (dispatch) => {
    let response = await profileAPI.updateStatus(newStatus);
    if (response.resultCode === 0) {
        dispatch(setStatus(newStatus));
    }
};

export default profileReducer;
