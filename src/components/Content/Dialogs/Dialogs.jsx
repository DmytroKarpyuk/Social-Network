import React from 'react';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import classes from './Dialogs.module.css';
import DialogForm from "./DialogForm";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={classes.Dialogs}>
            <div className={classes.dialogs_list}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <DialogForm addNewMessage={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;