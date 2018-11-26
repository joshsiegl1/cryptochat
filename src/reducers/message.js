import * as types from '../constants/ActionTypes'; 

const initialState = { 
    newUserGroup: {}, 
    messages: {}, 
    time: new Date()
}

const message = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_MESSAGES: 
        return { 
            ...state, 
            messages: { 
                ...state.messages, 
                [action.id]: action.messages
            }, 
            time: action.time
        }
        case types.SWITCH_TO_NEW_USERGROUP: 
        return { 
            ...state, 
            newUserGroup: action.newUserGroup
        }

        default: 
        return state; 
    }
}

export default message; 