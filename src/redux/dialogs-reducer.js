const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Roman'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Serg'},
    ],
    messages: [
        {id: 1, message: 'Hi, how is going?'},
        {id: 2, message: 'What about barbeku'},
        {id: 3, message: 'Movy nema'},
    ],
    newMessageBody: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 4, message: body}]
            };
        default:
            return state;
    }
};

export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body});
export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export default dialogsReducer;