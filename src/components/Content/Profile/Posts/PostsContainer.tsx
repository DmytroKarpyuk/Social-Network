import {actions} from '../../../../redux/reducers/profile-reducer';
import Posts, {DispatchPropsType, MapPropsType} from './Posts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../../redux/store/redux-store';

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    };
};

const PostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPost})(Posts);

export default PostsContainer;