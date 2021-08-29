import React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import styles from './Dialogs.module.css';
import DialogForm from './DialogForm';
import {DialogType, InitialStateType, MessageType} from '../../../redux/reducers/dialogs-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (message: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d: DialogType) => <Dialog name={d.name} key={d.id} id={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map((m: MessageType) => <Message message={m.message} key={m.id}/>);

    const addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={styles.Dialogs}>
            <div>
                {dialogsElements}
            </div>
            <div>
                <div className={styles.messages}>
                    {messagesElements}
                </div>
                <div>
                    <DialogForm addNewMessage={addNewMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;