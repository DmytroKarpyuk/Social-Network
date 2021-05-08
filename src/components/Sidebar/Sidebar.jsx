import React from "react";
import classes from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={classes.Sidebar}>
            <div>
                <NavLink to='/home' activeClassName={classes.active}>Home</NavLink>
            </div>
            <div>
                <NavLink to='/profile' activeClassName={classes.active}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' activeClassName={classes.active}>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to='/users' activeClassName={classes.active}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/news' activeClassName={classes.active}>News</NavLink>
            </div>
            <div>
                <NavLink to='/settings' activeClassName={classes.active}>Settings</NavLink>
            </div>
        </div>
    )
};

export default Sidebar;