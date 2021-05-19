import React from 'react';
import styles from './Posts.module.css';
import Post from "./Post/Post";
import NewPostForm from "./NewPostForm";

const Posts = (props) => {

    let postsElements = props.posts.map(p => <Post postText={p.postText} likesCount={p.likesCount} key={p.id}/>);

    const addNewPost = (values) => {
        props.addPost(values.newPostBody);
    };

    return (
        <div className={styles.Posts}>
            <NewPostForm addNewPost={addNewPost}/>
            <div className={styles.posts_list}>
                <h2>My ideas</h2>
                {postsElements}
            </div>
        </div>
    )
};

export default Posts;