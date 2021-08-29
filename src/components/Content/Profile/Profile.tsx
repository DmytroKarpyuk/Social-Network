import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import styles from './Profile.module.css';
import {ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType | null
    userStatus: string
    isOwner: boolean
    errors: Array<string>
    savePhoto: (file: File) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (newStatus: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
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
    );
};

export default Profile;