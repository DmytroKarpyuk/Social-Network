import React from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";
import NewPostForm from "./NewPostForm";

const Posts = (props) => {

    let postsElements = props.posts.map(p => <Post postText={p.postText} likesCount={p.likesCount} key={p.id}/>);

    const addNewPost = (values) => {
        props.addPost(values.newPostBody);
    };

    return (
        <div className={classes.Posts}>
            <h3>My posts</h3>
            <NewPostForm addNewPost={addNewPost}/>
            {postsElements}
        </div>
    )
};

export default Posts;