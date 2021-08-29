import React, {Suspense} from 'react';
import styles from './Content.module.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import Home from './Home/Home';
import ProfileContainer from './Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('../Users/UsersContainer'));
const News = React.lazy(() => import('./News/News'));
const Settings = React.lazy(() => import('./Settings/Settings'));
const LoginContainer = React.lazy(() => import('../Login/LoginContainer'));

const Content = () => {
    return (
        <div className={styles.Content}>
            <Suspense fallback={<Preloader/>}>
                <Switch>
                    <Redirect exact from='/' to='/profile'/>
                    <Route path='/home' render={() => <Home/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='*' render={() => <div>404 Not found</div>}/>
                </Switch>
            </Suspense>
        </div>
    );
};

export default Content;