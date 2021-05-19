import React from 'react';
import styles from './Post.module.css';
import lampImg from '../../../../../assets/images/lamp.png';

const Post = (props) => {
    return (
        <div className={styles.Post}>
            <div className={styles.content}>
                <img src={lampImg} alt='...'/>
                <p>{props.postText}</p>
            </div>
            <span className={styles.like}>👍 {props.likesCount}</span>
        </div>

    )
};

export default Post;