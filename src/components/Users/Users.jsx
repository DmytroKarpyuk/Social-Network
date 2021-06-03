import React from "react";
import styles from "./Users.module.css";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";

const Users = (props) => {
    return (
        <div className={styles.Users}>
            <User users={props.users}
                  isFollowingInProgress={props.isFollowingInProgress}
                  follow={props.follow}
                  unFollow={props.unFollow}
            />
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
            />
        </div>
    )
}

export default Users;