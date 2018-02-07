import * as types from '../constants/ActionTypes'; 

const initialState = { 
    chats: {}
}

const chats = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_CHAT: 
        console.log(action); 
        
        return { 
            ...state, 
            chats: { 
                ...state.chats, 
                [action.ticker]: action.chats
            }
        }

        default: 
            return state; 
    }
}

export default chats; 