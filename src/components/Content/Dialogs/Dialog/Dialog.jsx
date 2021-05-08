import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./Dialog.module.css";

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={classes.dialog}>
            <NavLink to={path} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog;