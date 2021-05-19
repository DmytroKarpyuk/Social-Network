import {connect} from "react-redux";
import Login from "./Login";
import {logInUser} from "../../redux/auth-reducer";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    errors: state.auth.errors
});

export default connect(mapStateToProps, {logInUser})(Login);