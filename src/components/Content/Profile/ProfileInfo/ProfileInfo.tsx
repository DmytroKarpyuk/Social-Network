import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../../assets/images/user_photo.png';
import ProfileStatus from './ProfileStatus';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../../types/types';
import { Button } from 'antd';

type PropsType = {
    profile: ProfileType | null
    userStatus: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    errors: Array<string>
}

const ProfileInfo: React.FC<PropsType> = props => {

    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmitForm = async (profile: ProfileType) => {
        await props.saveProfile(profile);
        setEditMode(false);
    };

    return (
        <div>
            <img src={props.profile.photos.large || userPhoto} className={styles.profile_img} alt='...' />
            {props.isOwner && <input type='file' onChange={onMainPhotoSelected} />}
            {editMode
                ? <ProfileDataForm profile={props.profile} onSubmitForm={onSubmitForm} errors={props.errors} />
                : <ProfileData profile={props.profile}
                    isOwner={props.isOwner}
                    userStatus={props.userStatus}
                    updateStatus={props.updateStatus}
                    activateEditMode={() => {
                        setEditMode(true);
                    }}
                />
            }
        </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    userStatus: string
    updateStatus: (newStatus: string) => void
    activateEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, activateEditMode, userStatus, updateStatus }) => {
    return (
        <div>
            <div><b>Full name: </b>{profile.fullName.toUpperCase()}</div>
            <ProfileStatus status={userStatus} updateStatus={updateStatus} />
            <div>{profile.aboutMe ? <p><b>About me: </b> {profile.aboutMe}</p> : null}</div>
            <div><b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
            <div>{profile.lookingForAJobDescription ? <p><b>Job description: </b> {profile.lookingForAJobDescription}</p> : null}</div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                    .map((key) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />;
                    })}
            </div>
            {isOwner && <div>
                <Button type="primary" onClick={activateEditMode}>Edit</Button>
            </div>}
        </div>
    );
};

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>;
};

export default ProfileInfo;