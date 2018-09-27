import * as types from '../constants/ActionTypes'; 

const initialState = { 
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

        default: 
        return state; 
    }
}

export default message; 