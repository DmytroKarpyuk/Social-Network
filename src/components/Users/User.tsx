import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../assets/images/user_photo.png';
import React from 'react';
import {UserType} from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unFollow}) => {

    return (
        <div className={styles.user}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                             className={styles.user_photo} alt='...'/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                  className={styles.follow_btn}
                                  onClick={() => {
                                      unFollow(user.id);
                                  }}>Unfollow
                        </button>
                        : <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                  className={styles.follow_btn}
                                  onClick={() => {
                                      follow(user.id);
                                  }}>Follow
                        </button>
                    }
                </div>
            </span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{'u.location.city'}</div>
                <div>{'u.location.country'}</div>
            </span>
        </div>
    );
};

export default User;
