import {BaseThunkType, InferActionsType} from '../store/redux-store';
import {chatAPI, ChatMessageType, StatusType} from '../../api/chat-api';
import {Dispatch} from 'redux';

const MESSAGES_RECEIVED = 'ideas-network/chat/MESSAGES_RECEIVED';
const STATUS_CHANGED = 'ideas-network/chat/STATUS_CHANGED';

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

// Chat Reducer
const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        case STATUS_CHANGED:
            return {
                ...state, status: action.payload.status
            };
        default:
            return state;
    }
};

// Actions
export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECEIVED, payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED, payload: {status}
    } as const)
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }

    return _newMessageHandler;
};

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }

    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start();
        chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    };
};

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
        chatAPI.stop();
    };
};

export const sendMessage = (message: string): ThunkType => {
    return async () => {
        chatAPI.sendMessage(message);
    };
};

export default chatReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
