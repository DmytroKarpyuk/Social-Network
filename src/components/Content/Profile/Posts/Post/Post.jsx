import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.Post}>
            <div className={classes.content}>
                <img src='https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png' alt='...'/>
                <p>{props.postText}</p>
            </div>
            <span className={classes.like}>👍 {props.likesCount}</span>
        </div>

    )
};

export default Post;