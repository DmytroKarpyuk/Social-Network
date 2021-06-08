import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.Post}>
            <div className={styles.content}>
                <p>💡 {props.postText}</p>
            </div>
            <span className={styles.like}>👍 {props.likesCount}</span>
        </div>

    )
};

export default Post;