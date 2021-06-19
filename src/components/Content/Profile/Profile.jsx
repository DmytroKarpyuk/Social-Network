import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import styles from './Profile.module.css';

const Profile = props => {
    return (
        <div className={styles.Profile}>
            <ProfileInfo profile={props.profile}
                         userStatus={props.userStatus}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
                         errors={props.errors}
            />
            <hr className={styles.hr}/>
            <PostsContainer/>
        </div>
    )
};

export default Profile;