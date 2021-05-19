import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setStatus = (userStatus) => ({type: SET_STATUS, userStatus});

// Thunks
export const getProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
    });
};

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(userStatus => {
        dispatch(setStatus(userStatus));
    });
};

export const updateStatus = (newStatus) => (dispatch) => {
    profileAPI.updateStatus(newStatus).then(data => {
        if (data.resultCode === 0){
            dispatch(setStatus(newStatus));
        }
    });
};

export default profileReducer;
