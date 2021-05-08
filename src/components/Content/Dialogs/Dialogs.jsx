import React from 'react';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import classes from './Dialogs.module.css';
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);
    let newMessageBody = props.dialogsPage.newMessageBody;

    const onSendMessageClick = () => {
        props.sendMessage();
    };

    const onNewMessageChange = (event) => {
        let body = event.target.value;
        props.updateNewMessageBody(body);
    };

    if (!props.isAuth) return <Redirect to='/login'/>

    return (
        <div className={classes.Dialogs}>
            <div className={classes.dialogs_list}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea onChange={onNewMessageChange} value={newMessageBody} placeholder='Enter you message'/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;