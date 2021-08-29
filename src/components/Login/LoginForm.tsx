import {Form, Formik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FieldElement from '../common/Fields/FieldElement';
import styles from './LoginForm.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginForm = ({onSubmitLogin, errors, captchaUrl}: any) => {

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        captcha: captchaUrl && Yup.string().required('Required')
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitLogin}>
            <Form className={styles.LoginForm}>
                <div>
                    <FieldElement name='email' placeholder='Email' component='input'/>
                </div>
                <div>
                    <FieldElement name='password' placeholder='Password' component='input' type='password'/>
                </div>
                <div><FieldElement name='rememberMe' component='input' type='checkbox'/>Remember me</div>
                <div>
                    {captchaUrl && <img src={captchaUrl} alt='...'/>}
                </div>
                <div>
                    {captchaUrl && <FieldElement component='input' placeholder='Captcha symbols' name='captcha'/>}
                </div>
                {errors ? errors.map((e: string) => <div key={errors.indexOf(e)} className={styles.error}>{e}</div>) : null}
                <button type='submit'>Login</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;