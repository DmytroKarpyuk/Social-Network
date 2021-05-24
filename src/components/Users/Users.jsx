import React from "react";
import userPhoto from "../../assets/images/user_photo.png";
import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.Users}>
            {
                props.users.map(u => {
                    return (
                        <div key={u.id} className={styles.user}>
                            <span>
                                <div>
                                    <NavLink to={`/profile/` + u.id}>
                                        <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                                             className={styles.user_photo} alt='...'/>
                                    </NavLink>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button disabled={props.isFollowingInProgress.some(id => id === u.id)}
                                                  className={styles.follow_btn}
                                                  onClick={() => {
                                                      props.unFollow(u.id)
                                                  }}>Unfollow</button>
                                        : <button disabled={props.isFollowingInProgress.some(id => id === u.id)}
                                                  className={styles.follow_btn}
                                                  onClick={() => {
                                                      props.follow(u.id)
                                                  }}>Follow</button>
                                    }
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </span>
                                <span>
                                    <div>{'u.location.city'}</div>
                                    <div>{'u.location.country'}</div>
                                </span>
                            </span>
                        </div>
                    )
                })
            }
            <div>
                {pages.map(p => {
                    return (
                        <button className={props.currentPage === p && styles.page_active} onClick={() => {
                            props.onPageChanged(p)
                        }}>{p}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Users;