import React from 'react';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.css';
import {MapDispatchPropsType, MapStatePropsType} from './LoginContainer';

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmitLogin = (values: any) => {
        props.logInUser(values.email, values.password, values.rememberMe, values.captcha);
    };

    if (props.isAuth) return <Redirect to='/profile'/>;

    return (
        <div className={styles.Login}>
            <h2>Login</h2>
            <LoginForm onSubmitLogin={onSubmitLogin} errors={props.errors} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

export default Login;