import React from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';

const Users = (props) => {
    return (
        <>
            <div className={styles.Users}>
                <User users={props.users}
                      isFollowingInProgress={props.isFollowingInProgress}
                      follow={props.follow}
                      unFollow={props.unFollow}
                />
            </div>
            <Paginator totalItemsCount={props.totalItemsCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
            />
        </>
    )
};

export default Users;