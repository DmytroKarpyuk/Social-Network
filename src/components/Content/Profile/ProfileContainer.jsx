import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, setUserProfile, updateStatus} from "../../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizeduserId
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     userStatus={this.props.userStatus}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                // saveProfile={this.props.saveProfile}
                     errors={this.props.errors}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        authorizeduserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        errors: state.profilePage.errors
    }
};

export default compose(
    connect(mapStateToProps, {setUserProfile, getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);