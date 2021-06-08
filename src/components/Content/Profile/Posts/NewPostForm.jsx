import React from "react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import FieldElement from "../../../common/Fields/FieldElement";
import styles from './NewPostForm.module.css';

const NewPostForm = props => {
    const validate = Yup.object({
        newPostBody: Yup.string()
            .max(50, 'Too Long!')
            .min(2, 'Too Short!')
    })

    return (
        <Formik initialValues={{newPostBody: ''}} onSubmit={props.addNewPost} validationSchema={validate}>
            {() => (
                <div className={styles.NewPostForm}>
                    <h2>Create idea</h2>
                    <Form>
                        <FieldElement name='newPostBody' component='textarea' placeholder='Enter your post text'/>
                        <div>
                            <button type='submit' className={styles.addpost_btn}>Add idea 💡</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
};

export default NewPostForm;