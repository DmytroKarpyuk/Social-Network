import React, {Suspense} from 'react';
import styles from './Content.module.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import ProfileContainer from './Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const Settings = React.lazy(() => import('./Settings/Settings'));
const UsersPage = React.lazy(() => import('../Users/UsersPage'));
const Login = React.lazy(() => import('../Login/Login'));
const News = React.lazy(() => import('./News/News'));
const Home = React.lazy(() => import('./Home/Home'));
const ChatPage = React.lazy(() => import('../../pages/Chat/ChatPage'));

const Content = () => {
    return (
        <div className={styles.Content}>
            <Suspense fallback={<Preloader/>}>
                <Switch>
                    <Redirect exact from='/' to='/profile'/>
                    <Route path='/home' render={() => <Home/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersPage pageTitle='Users'/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/chat' render={() => <ChatPage/>}/>
                    <Route path='*' render={() => <div>404 Not found</div>}/>
                </Switch>
            </Suspense>
        </div>
    );
};

export default Content;