import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import styles from './Profile.module.css';

const Profile = props => {
    return (
        <div className={styles.Profile}>
            <ProfileInfo userProfile={props.userProfile} userStatus={props.userStatus} updateStatus={props.updateStatus}/>
            <hr/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;