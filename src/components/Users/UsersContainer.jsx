import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {setCurrentPage, follow, unFollow, toggleIsFollowingProgress, requestUsers} from "../../redux/reducers/users-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getCurrentPage, getIsFetching, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsers} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize); // thunk
    };

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize); // thunk
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
        // Selectors
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    };
}

export default compose(
    connect(mapStateToProps, {setCurrentPage, toggleIsFollowingProgress, requestUsers, follow, unFollow}),
    withAuthRedirect
)(UsersContainer);
