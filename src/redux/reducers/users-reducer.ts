import {updateObjectInArray} from '../../utils/object-helpers';
import {UserType} from '../../types/types';
import {BaseThunkType, InferActionsType} from '../store/redux-store';
import {Dispatch} from 'redux';
import {usersAPI} from '../../api/users-api';
import {APIResponseType} from '../../api/api';

const FOLLOW = 'ideas-network/users/FOLLOW';
const UNFOLLOW = 'ideas-network/users/UNFOLLOW';
const SET_USERS = 'ideas-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'ideas-network/users/SET_CURRENT_PAGE';
const SET_FILTER = 'ideas-network/users/SET_FILTER';
const SET_TOTAL_USERS_COUNT = 'ideas-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'ideas-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'ideas-network/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users ID
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

// Reducer: Users reducer
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_FILTER:
            return {
                ...state, filter: action.payload
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItemsCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

// Actions
export const actions = {
    startFollow: (userId: number) => ({type: FOLLOW, userId} as const),

    stopFollow: (userId: number) => ({type: UNFOLLOW, userId} as const),

    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),

    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),

    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),

    setTotalUsersCount: (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount} as const),

    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),

    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)
};

// Thunk: Request users
export const requestUsers = (queryPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(queryPage));
        dispatch(actions.setFilter(filter));
        const response = await usersAPI.getUsers(queryPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUsersCount(response.totalCount));
    };
};

// Thunk: Follow
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.startFollow);
    };
};

// Thunk: Unfollow
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.stopFollow);
    };
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
