import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {setCurrentPage, follow, unFollow, toggleIsFollowingProgress, getUsers} from "../../redux/users-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); // thunk
    };

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize); // thunk
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       unFollow={this.props.unFollow} // thunk
                       follow={this.props.follow} // thunk
                       toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                       isFollowingInProgress={this.props.isFollowingInProgress}
                />
            </>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
    };
}

export default compose(
    connect(mapStateToProps, {setCurrentPage, toggleIsFollowingProgress, getUsers, follow, unFollow}),
    withAuthRedirect
)(UsersContainer);
