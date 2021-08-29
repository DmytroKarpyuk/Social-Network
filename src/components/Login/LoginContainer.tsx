import {connect} from 'react-redux';
import Login from './Login';
import {logInUser} from '../../redux/reducers/auth-reducer';
import {AppStateType} from '../../redux/store/redux-store';

export type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
    errors: Array<string>
}
export type MapDispatchPropsType = {
    logInUser: (mail: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    errors: state.auth.errors,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {logInUser})(Login);