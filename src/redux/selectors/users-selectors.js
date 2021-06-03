import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
};

// Super Selector
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(() => true);
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getIsFollowingInProgress = (state) => {
    return state.usersPage.isFollowingInProgress;
};
