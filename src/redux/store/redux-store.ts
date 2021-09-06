import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import appReducer from '../reducers/app-reducer';
import authReducer from '../reducers/auth-reducer';
import profileReducer from '../reducers/profile-reducer';
import dialogsReducer from '../reducers/dialogs-reducer';
import sidebarReducer from '../reducers/sidebar-reducer';
import usersReducer from '../reducers/users-reducer';
import chatReducer from '../reducers/chat-reducer';
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    chat: chatReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleWare))
);

export default store;

type RootReducerType = typeof rootReducer; // (globalState) => GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>