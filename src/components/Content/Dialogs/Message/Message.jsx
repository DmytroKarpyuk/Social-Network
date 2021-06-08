import React from "react";
import styles from "./Message.module.css";

const Message = (props) => <div className={styles.message}>{props.message}</div>;

export default Message;