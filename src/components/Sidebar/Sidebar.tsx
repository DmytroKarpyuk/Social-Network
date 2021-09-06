import React from 'react';
import styles from './Sidebar.module.css';
import {NavLink} from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className={styles.Sidebar}>
            <div>
                <NavLink to='/home' activeClassName={styles.active}>Home</NavLink>
            </div>
            <div>
                <NavLink to='/profile' activeClassName={styles.active}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' activeClassName={styles.active}>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to='/users' activeClassName={styles.active}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/chat' activeClassName={styles.active}>Chat</NavLink>
            </div>
            <div>
                <NavLink to='/news' activeClassName={styles.active}>News</NavLink>
            </div>
            <div>
                <NavLink to='/settings' activeClassName={styles.active}>Settings</NavLink>
            </div>
        </div>
    );
};

export default Sidebar;