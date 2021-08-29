import {getAuthUserData} from './auth-reducer';
import {InferActionsType} from '../store/redux-store';

const INITIALIZED_SUCCESS = 'ideas-network/app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

// App Reducer
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

// Actions
export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
};

// Thunks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default appReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>