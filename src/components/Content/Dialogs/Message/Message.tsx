import React from 'react';
import styles from './Message.module.css';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => <div className={styles.message}>{props.message}</div>;

export default Message;