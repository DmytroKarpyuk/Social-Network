import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post';
import NewPostForm from './NewPostForm';
import {PostType} from '../../../../types/types';

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const Posts: React.FC<MapPropsType & DispatchPropsType> = props => {

    const postsElements = props.posts.reverse().map((p: PostType) => <Post postText={p.postText} likesCount={p.likesCount} key={p.id}/>);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addNewPost = (values: any) => {
        props.addPost(values.newPostText);
        console.log(values);
    };

    return (
        <div className={styles.Posts}>
            <NewPostForm addNewPost={addNewPost}/>
            <div className={styles.posts_list}>
                <h2>My ideas</h2>
                {postsElements}
            </div>
        </div>
    );
};

const MyPostsMemorized = React.memo(Posts);

export default MyPostsMemorized;