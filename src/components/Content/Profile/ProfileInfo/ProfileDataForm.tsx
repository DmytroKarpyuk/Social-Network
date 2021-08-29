import React from 'react';
import * as Yup from 'yup';
import styles from './ProfileInfo.module.css';
import {Formik} from 'formik';
import {ProfileType} from '../../../../types/types';
import FieldElement from '../../../common/Fields/FieldElement';

type PropsType = {
    profile: ProfileType
    errors: Array<string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmitForm: any
}

const ProfileDataForm: React.FC<PropsType> = ({profile, onSubmitForm, errors}) => {

    const initialValues = {
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: false,
        lookingForAJobDescription: profile.lookingForAJobDescription
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().min(3, 'Please enter your real name').required('Full name is required'),
        aboutMe: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
        lookingForAJobDescription: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!'),
        contacts: Yup.object()
    });


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm}>
            {() => (
                <div>
                    <div>
                        <b>Full name: </b>
                        <FieldElement name='fullName' type='text' placeholder='Full name' component='input' value={initialValues.fullName}/>
                    </div>
                    <div>
                        <b>About me: </b>
                        <FieldElement name='aboutMe' placeholder='About me' component='textarea' value={initialValues.aboutMe}/>
                    </div>
                    <div>
                        <b>Looking for a job: </b>
                        <FieldElement name='lookingForAJob' type='checkbox' value={initialValues.lookingForAJob}/>
                    </div>
                    <div>
                        <b>Job description: </b>
                        <FieldElement name='lookingForAJobDescription' placeholder='Job description' component='textarea'
                                      value={initialValues.lookingForAJobDescription}/>
                    </div>
                    <div>
                        <b>Contacts</b>:
                        {Object.keys(profile.contacts).map(key => {
                            return (
                                <div key={key} className={styles.contact}>
                                    <b>{key}:</b><FieldElement name={'contacts.' + key} placeholder={key} component='input'/>
                                </div>
                            );
                        })}
                    </div>
                    {errors ? errors.map(e => <div key={errors.indexOf(e)} className={styles.error}>{e}</div>) : null}
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default ProfileDataForm;