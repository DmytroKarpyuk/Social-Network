import React, {useEffect, useRef, useState} from 'react';
import {Form, Formik} from 'formik';
import FieldElement from '../../components/common/Fields/FieldElement';
import * as Yup from 'yup';
import {Avatar} from 'antd';
import {ChatMessageType} from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/reducers/chat-reducer';
import {AppStateType} from '../../redux/store/redux-store';
import {Redirect} from 'react-router-dom';

const ChatPage: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    if (!isAuth) return <Redirect to='/login'/>;

    return (
        <Chat/>
    );
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh the page</div>}
            <>
                <h1>Chat Surf</h1>
                <Messages/>
                <AddMessageForm/>
            </>
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScrollI, setIsAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScrollI && setIsAutoScroll(true);
        } else {
            isAutoScrollI && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScrollI) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return (
        <div style={{height: '400px', overflow: 'auto'}} onScroll={scrollHandler}>
            <h2>Messages</h2>
            {
                messages.map((m, index) => <Message message={m} key={index}/>)
            }
            <div ref={messagesAnchorRef}>=)</div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <Avatar size={32} src={message.photo}/><b>{message.userName}</b>
            <br/>
            <p>{message.message}</p>
            <hr/>
        </div>
    );
};

const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);

    const initialValues = {
        message: ''
    };
    const validationSchema = Yup.object({
        message: Yup.string().max(40, 'Message has over 40 characters')
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        dispatch(sendMessage(values.message));
    };

    return (
        <div>
            AddMessageForm
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <FieldElement name='message' component='textarea'/>
                    <div>
                        <button type='submit' disabled={status !== 'ready'}>Send</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ChatPage;
