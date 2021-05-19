import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.css';

const Login = props => {
    const onSubmitLogin = (values) => {
        props.logInUser(values.email, values.password, values.rememberMe);
    };

    if (props.isAuth) return <Redirect to='/profile'/>

    return (
        <div className={styles.Login}>
            <h2>Login</h2>
            <LoginForm onSubmitLogin={onSubmitLogin} errors={props.errors}/>
        </div>
    )
};

export default Login;