import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Dialog.module.css';

type PropsType = {
    id: number
    name: string
}

const Dialog: React.FC<PropsType> = (props) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={styles.dialog}>
            <NavLink to={path} activeClassName={styles.active}>{props.name}</NavLink>
        </div>
    );
};

export default Dialog;