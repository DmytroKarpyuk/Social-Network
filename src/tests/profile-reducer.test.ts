import profileReducer, {actions} from '../redux/reducers/profile-reducer';

const state = {
    profile: null,
    userStatus: '',
    posts: [
        {id: 1, postText: 'This is my first post!', likesCount: 36},
        {id: 2, postText: 'Another post', likesCount: 68},
        {id: 3, postText: 'I have an idea', likesCount: 26}
    ],
    errors: []
};

test('length of posts should be incremented', () => {
    const action = actions.addPost('New Post Text');
    const newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});

test('message of new post should be correct', () => {
    const action = actions.addPost('New Post Text');
    const newState = profileReducer(state, action);
    expect(newState.posts[3].postText).toBe('New Post Text');
});

test('after deleting length of messages should be decrement', () => {
    const action = actions.deletePost(1);
    const newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});