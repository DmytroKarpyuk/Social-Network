import React from "react";
import * as Yup from "yup";
import styles from './ProfileInfo.module.css';
import {Form, Formik} from "formik";
import FieldElement from "../../../common/Fields/FieldElement";

const ProfileDataForm = ({profile, onSubmitForm, errors}) => {
    const validate = Yup.object({
        fullName: Yup.string()
            .required('Required')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        aboutMe: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        lookingForAJobDescription: Yup.string()
            .min(10, 'Too Short!')
            .max(50, 'Too Long!')
    });
    return (
        <Formik initialValues={{fullName: profile.fullName, aboutMe: profile.aboutMe, lookingForAJobDescription: profile.lookingForAJobDescription}}
                onSubmit={onSubmitForm} validationSchema={validate}>
            <Form>
                <div>
                    <b>Full name: </b>
                    <FieldElement name='fullName' placeholder='Full name' component='input'/>
                </div>
                <div>
                    <b>About me: </b>
                    <FieldElement name='aboutMe' placeholder='About me' component='textarea'/>
                </div>
                <div>
                    <b>Looking for a job: </b>
                    <FieldElement name='lookingForAJob' component='input' type='checkbox'/>
                </div>
                <div>
                    <b>Job description: </b>
                    <FieldElement name='lookingForAJobDescription' placeholder='Job description' component='textarea'/>
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts)
                    .map(key => {
                        return (
                            <div key={key} className={styles.contact}>
                                <b>{key}:</b><FieldElement name={'contacts.' + key} placeholder={key} component='input'/>
                            </div>
                        )
                    })}
                </div>
                {errors ? errors.map(e => <div key={errors.indexOf(e)} className={styles.error}>{e}</div>) : null}
                <div>
                    <button onClick={() => {
                    }}>Save
                    </button>
                </div>
            </Form>
        </Formik>

    )
};

export default ProfileDataForm;