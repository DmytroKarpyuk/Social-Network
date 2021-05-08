import React from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";

const Posts = (props) => {

    let postsElements = props.posts.map(p => <Post postText={p.postText} likesCount={p.likesCount} key={p.id}/>);

    const onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (event) => {
        let text = event.target.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={classes.Posts}>
            <h3>My posts</h3>
            <textarea onChange={onPostChange} value={props.newPostText} placeholder='Enter your post text'/>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            {postsElements}
        </div>
    )
};

export default Posts;