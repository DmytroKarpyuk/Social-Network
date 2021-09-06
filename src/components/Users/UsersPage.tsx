import React from 'react';
import {Users} from './Users';
import Preloader from '../common/Preloader/Preloader';
import {useSelector} from 'react-redux';
import {getIsFetching} from '../../redux/selectors/users-selectors';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/store/redux-store';

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    if (!isAuth) return <Redirect to='/login'/>;

    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    );
};

export default UsersPage;

type UsersPagePropsType = {
    pageTitle: string
}
