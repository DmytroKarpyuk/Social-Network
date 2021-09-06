import React from 'react';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/store/redux-store';
import {logInUser} from '../../redux/reducers/auth-reducer';

const Login: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const errors = useSelector((state: AppStateType) => state.auth.errors);
    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmitLogin = (values: any) => {
        dispatch(logInUser(values.email, values.password, values.rememberMe, values.captcha));
    };

    if (isAuth) return <Redirect to='/profile'/>;

    return (
        <div className={styles.Login}>
            <h2>Login</h2>
            <LoginForm onSubmitLogin={onSubmitLogin} errors={errors} captchaUrl={captchaUrl}/>
        </div>
    );
};

export default Login;
