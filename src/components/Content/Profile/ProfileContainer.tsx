import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfile, getStatus, savePhoto, saveProfile, actions, updateStatus} from '../../../redux/reducers/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../../redux/store/redux-store';
import {ProfileType} from '../../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (newStatus: string) => void
    savePhoto: (file: File) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if (!userId) {
            console.error('ID should exists in URI params or in state (\'authorizedUserId\')');
        } else {
            this.props.getProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
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
                     saveProfile={this.props.saveProfile}
                     errors={this.props.errors}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        errors: state.profilePage.errors
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserProfile: actions.setUserProfile, getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);