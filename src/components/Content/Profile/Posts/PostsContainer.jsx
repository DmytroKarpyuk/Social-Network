import {addPost, updateNewPostText,} from "../../../../redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    };
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text));
//         },
//         addPost: () => {
//             dispatch(addPostActionCreator());
//         }
//     }
// };

const PostsContainer = connect(mapStateToProps, {updateNewPostText, addPost})(Posts);
export default PostsContainer;