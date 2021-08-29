import React from 'react';
import {Form, Formik, FormikHelpers, FormikValues} from 'formik';
import * as Yup from 'yup';
import FieldElement from '../../../common/Fields/FieldElement';
import styles from './NewPostForm.module.css';

type PropsType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addNewPost: ((values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>) & ((newPostText: string) => void)
}

const NewPostForm: React.FC<PropsType> = (props) => {

    const initialValues = {
        newPostText: ''
    };

    const validationSchema = Yup.object({
        newPostText: Yup.string()
            .max(50, 'Too Long!')
            .min(2, 'Too Short!')
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={props.addNewPost}>
            {() => (
                <div className={styles.NewPostForm}>
                    <h2>Create idea 💡</h2>
                    <Form>
                        <FieldElement name='newPostText' component='textarea' placeholder='Enter your post text'/>
                        <div>
                            <button type='submit' className={styles.addpost_btn}>Add idea</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default NewPostForm;