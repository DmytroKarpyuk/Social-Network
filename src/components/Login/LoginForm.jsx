import {Field, Form, Formik} from "formik";
import React from 'react';

const onSubmitLogin = (values, actions) => {
    console.log(values);
    // setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     actions.setSubmitting(false);
    // }, 1000);
};

export const LoginForm = props => {
    return (
        <Formik initialValues={{login: '', password: '', rememberMe: false}} onSubmit={onSubmitLogin}>
            <Form>
                <div>
                    <Field placeholder='Login' name='login' component='input'/>
                </div>
                <div>
                    <Field placeholder='Password' name='password' component='input'/>
                </div>
                <div>
                    <Field type='checkbox' name='rememberMe' component='input'/>
                    Remember me
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
};

export default LoginForm;