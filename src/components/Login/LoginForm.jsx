import {Form, Formik} from 'formik';
import React from 'react';
import * as Yup from "yup";
import FieldElement from '../common/Fields/FieldElement';
import styles from './LoginForm.module.css';

export const LoginForm = ({onSubmitLogin, errors}) => {
    const validate = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
    });
    return (
        <Formik initialValues={{email: '', password: '', rememberMe: false}} onSubmit={onSubmitLogin} validationSchema={validate}>
            <Form className={styles.LoginForm}>
                <FieldElement name='email' placeholder='Email' component='input'/>
                <FieldElement name='password' placeholder='Password' component='input' type='password'/>
                <FieldElement name='rememberMe' component='input' type='checkbox'/>
                Remember me
                {errors ? errors.map(e => <div key={errors.indexOf(e)} className={styles.error}>{e}</div>) : null}
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
};

export default LoginForm;