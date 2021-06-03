import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({logInUser, isAuth, errors}) => {
    const onSubmitLogin = (values) => {
        logInUser(values.email, values.password, values.rememberMe);
    };

    if (isAuth) return <Redirect to='/profile'/>

    return (
        <div className={styles.Login}>
            <h2>Login</h2>
            <LoginForm onSubmitLogin={onSubmitLogin} errors={errors}/>
        </div>
    )
};

export default Login;