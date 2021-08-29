import {actions, follow, unFollow} from '../redux/reducers/users-reducer';
import {APIResponseType, ResultCodeEnum} from '../api/api';
import {usersAPI} from '../api/users-api';

jest.mock('../api/users-api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const successResult: APIResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
};

test('Follow thunk with success', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(successResult));// follow() from users-api

    const thunk = follow(10); // follow() from users-reducer
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 10));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.startFollow(10));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 10));
});

test('Unfollow thunk with success', async () => {
    userAPIMock.unFollow.mockReturnValue(Promise.resolve(successResult));// follow() from users-api

    const thunk = unFollow(10); // follow() from users-reducer
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 10));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.stopFollow(10));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 10));
});
