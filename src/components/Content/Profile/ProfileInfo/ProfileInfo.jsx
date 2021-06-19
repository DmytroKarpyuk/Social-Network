import React, {useState} from 'react';
import Preloader from "../../../common/Preloader/Preloader";
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../../assets/images/user_photo.png';
import ProfileStatus from './ProfileStatus';
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = props => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmitForm = (formData) => {
        props.saveProfile(formData);
        console.log('Inside comp:', props.errors);
        if (props.errors.length === 0) {
            setEditMode(false);
        }
    };

    return (
        <div>
            <img src={props.profile.photos.large || userPhoto} className={styles.profile_img} alt='...'/>
            {props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataForm profile={props.profile} onSubmitForm={onSubmitForm} errors={props.errors}/>
                : <ProfileData profile={props.profile}
                               isOwner={props.isOwner}
                               userStatus={props.userStatus}
                               updateStatus={props.updateStatus}
                               activateEditMode={() => {
                                   setEditMode(true)
                               }}
                />
            }
        </div>
    )
};

const ProfileData = ({profile, isOwner, activateEditMode, userStatus, updateStatus}) => {
    return (
        <div>
            <div><b>Full name: </b>{profile.fullName.toUpperCase()}</div>
            <ProfileStatus userStatus={userStatus} updateStatus={updateStatus}/>
            <div>{profile.aboutMe ? <p><b>About me: </b> {profile.aboutMe}</p> : null}</div>
            <div><b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
            <div>{profile.lookingForAJobDescription ? <p><b>Job description: </b> {profile.lookingForAJobDescription}</p> : null}</div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
            {isOwner && <div>
                <button onClick={activateEditMode}>Edit</button>
            </div>}
        </div>
    )
};

const Contact = ({contactTitle, contactValue}) => {
    return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
};

export default ProfileInfo;