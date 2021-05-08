import React from 'react';
import Preloader from "../../../Preloader/Preloader";
import styles from './ProfileInfo.module.css';
import userPhoto from "../../../../assets/images/user_photo.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = props => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (
        <div>
            <img src={props.userProfile.photos.large || userPhoto} className={styles.profile_img} alt='...'/>
            <h3>{props.userProfile.fullName.toUpperCase()}</h3>
            <ProfileStatus userStatus={props.userStatus} updateStatus={props.updateStatus}/>
            <p><b>About me: </b> {props.userProfile.aboutMe}</p>
            <p>Contacts:</p>
            <ul>
                <li><a href={props.userProfile.contacts.facebook}>{props.userProfile.contacts.facebook}</a></li>
                <li><a href={props.userProfile.contacts.instagram}>{props.userProfile.contacts.instagram}</a></li>
            </ul>
        </div>
    )
};

export default ProfileInfo;