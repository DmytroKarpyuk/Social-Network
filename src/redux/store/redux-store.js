import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "../reducers/profile-reducer";
import dialogsReducer from "../reducers/dialogs-reducer";
import sidebarReducer from "../reducers/sidebar-reducer";
import usersReducer from "../reducers/users-reducer";
import authReducer from "../reducers/auth-reducer";
import thunkMiddleWare from "redux-thunk";
import appReducer from "../reducers/app-reducer";

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
window.store = store;

export default store;