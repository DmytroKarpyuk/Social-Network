import {InferActionsType} from '../store/redux-store';

const SEND_MESSAGE = 'ideas-network/dialogs/SEND_MESSAGE';

const initialState = {
    dialogs: [
        {id: 1, name: 'Roman'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Serg'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi, how is going?'},
        {id: 2, message: 'What about barbeku'},
        {id: 3, message: 'Movy nema'},
    ] as Array<MessageType>
};

let newMessageBody = '';

// Dialogs Reducer
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            newMessageBody = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: ++initialState.messages.length, message: newMessageBody}]
            };
        default:
            return state;
    }
};

// Actions
export const actions = {
    sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody})
};

export default dialogsReducer;

export type DialogType = {
    id: number
    name: string
};
export type MessageType = {
    id: number
    message: string
};
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
