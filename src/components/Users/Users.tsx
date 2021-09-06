import React, {useEffect} from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import {UsersSearchForm} from './UsersSearchForm';
import {FilterType, requestUsers, follow, unFollow} from '../../redux/reducers/users-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalItemsCount,
    getUsers,
    getUsersFilter
} from '../../redux/selectors/users-selectors';
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring';

export const Users: React.FC<PropsType> = () => {

    const followingInProgress = useSelector(getFollowingInProgress);
    const totalItemsCount = useSelector(getTotalItemsCount);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsers);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
        let actualPage = currentPage;
        let actualFilter = filter;

        if (parsed.page) actualPage = Number(parsed.page);
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};
        if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'};

        dispatch(requestUsers(actualPage, pageSize, actualFilter));

        console.log('actualPage, pageSize, actualFilter', actualPage, pageSize, actualFilter);
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {};
        if(filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        });
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const startFollow = (userId: number) => {
        dispatch(follow(userId));
    };

    const stopFollow = (userId: number) => {
        dispatch(unFollow(userId));
    };

    return (
        <>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div className={styles.Users}>
                {
                    users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                                         follow={startFollow} unFollow={stopFollow}/>
                    )
                }
            </div>
            <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />
        </>
    );
};

type PropsType = {};
type QueryParamsType = { term?: string, page?: string, friend?: string };