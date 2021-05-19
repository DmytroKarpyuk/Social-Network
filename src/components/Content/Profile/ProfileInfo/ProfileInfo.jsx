import React from 'react';
import Preloader from "../../../common/Preloader/Preloader";
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../../assets/images/user_photo.png';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = props => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    const isHasProperties = (obj) => {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] !== "") {
                return true;
            }
        }
        return false;
    }
    return (
        <div className={styles.profile_info}>
            <img src={props.userProfile.photos.large || userPhoto} className={styles.profile_img} alt='...'/>
            <h3>{props.userProfile.fullName.toUpperCase()}</h3>
            <ProfileStatus userStatus={props.userStatus} updateStatus={props.updateStatus}/>
            {props.userProfile.aboutMe ? <p><b>About me: </b> {props.userProfile.aboutMe}</p> : null}
            {isHasProperties(props.userProfile.contacts)
                ? <p>Contacts:</p>
                : null
            }
            <ul>
                {props.userProfile.contacts.facebook
                    ? <li><a href={props.userProfile.contacts.facebook}>facebook</a></li>
                    : null
                }
                {props.userProfile.contacts.instagram
                    ? <li><a href={props.userProfile.contacts.instagram}>instagram</a></li>
                    : null
                }
            </ul>
        </div>
    )
};

export default ProfileInfo;