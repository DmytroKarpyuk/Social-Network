import React from 'react';
import Home from "./Home/Home";
import ProfileContainer from "./Profile/ProfileContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import News from "./News/News";
import Settings from "./Settings/Settings";
import LoginContainer from "../Login/LoginContainer";
import styles from './Content.module.css';
import {Route} from "react-router-dom";

const Content = () => {
    return (
        <div className={styles.Content}>
            <Route path='/home' render={() => <Home/>}/>
            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/news' render={() => <News/>}/>
            <Route path='/settings' render={() => <Settings/>}/>
            <Route path='/login' render={() => <LoginContainer/>}/>
        </div>
    )
}

export default Content;