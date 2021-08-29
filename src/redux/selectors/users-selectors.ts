import {createSelector} from 'reselect';
import {AppStateType} from '../store/redux-store';

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

// Super Selector
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(() => true);
});

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalItemsCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};
