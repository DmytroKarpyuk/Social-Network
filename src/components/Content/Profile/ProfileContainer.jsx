import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfile, getStatus, setUserProfile, updateStatus } from "../../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizeduserId
            // userId = '16454';
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} userProfile={this.props.userProfile} userStatus={this.props.userStatus} updateStatus={this.props.updateStatus} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus,
        authorizeduserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, { setUserProfile, getProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);