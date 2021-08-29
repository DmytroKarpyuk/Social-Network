import usersReducer, {actions, InitialStateType} from '../redux/reducers/users-reducer';

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Roman', followed: true, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Max', followed: false, photos: {small: null, large: null}, status: 'status 1'
            }
            , {
                id: 2, name: 'Serg', followed: true, photos: {small: null, large: null}, status: 'status 2'
            },
            {
                id: 3, name: 'Daniel', followed: false, photos: {small: null, large: null}, status: 'status 3'
            }
        ],
        pageSize: 10,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
});

test('Follow success', () => {
    const newState = usersReducer(state, actions.startFollow(1));
    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('Unfollow success', () => {
    const newState = usersReducer(state, actions.stopFollow(0));
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[0].followed).toBeFalsy();
});