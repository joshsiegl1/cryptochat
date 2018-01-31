import * as types from '../constants/ActionTypes'; 

const initialState = { 
    chats: {}
}

const chats = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_POSTS: 
        return { 
            ...state, 
            chats: { 
                ...state.chats, 
                [action.id]: action.comments
            }
        }

        default: 
            return state; 
    }
}

export default chats; 