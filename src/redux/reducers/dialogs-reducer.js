const SEND_MESSAGE = 'ideas-network/dialogs/SEND_MESSAGE';

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
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: ++initialState.messages.length, message: body}]
            };
        default:
            return state;
    }
};

export const sendMessage = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});
export default dialogsReducer;