import profileReducer, {addPost, deletePost} from "../redux/reducers/profile-reducer";

let state = {
    posts: [
        {id: 1, postText: 'This is my first post!', likesCount: 36},
        {id: 2, postText: 'Another post', likesCount: 68},
        {id: 3, postText: 'I have an idea', likesCount: 26}
    ]
};

test('length of posts should be incremented', () => {
    let action = addPost('New Post Text');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

test('message of new post should be correct', () => {
    let action = addPost('New Post Text');
    let newState = profileReducer(state, action);
    expect(newState.posts[3].postText).toBe('New Post Text');
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});