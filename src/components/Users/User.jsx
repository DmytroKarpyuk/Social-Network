import styles from "./User.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user_photo.png";
import React from "react";

const User = props => {
    return (
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
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.city'}</div>
                        <div>{'u.location.country'}</div>
                    </span>
                </div>
            )
        })
    )
}

export default User;
