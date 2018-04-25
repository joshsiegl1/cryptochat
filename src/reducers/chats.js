import * as types from '../constants/ActionTypes'; 

const initialState = { 
    chats: {}, 
    comment: {}, 
    replies: {}, 
    time: new Date()
}

const chats = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_CHAT:         
        return { 
            ...state, 
            chats: { 
                ...state.chats, 
                [action.ticker]: action.chats
            }, 
            time: action.time
        }

        case types.GET_POST: 
        return { 
            ...state, 
            comment: { 
                [action.postID]: { 
                    content: action.comment, 
                    replies: action.replies
                }
            }, 
            time: action.time
        }

        case types.GET_REPLIES: 

        return { 
            ...state, 
            replies: {
                ...state.replies,  
                //Try removing the "results" object on the api, 
                //might not be catching that it's a new object
                [action.postID]: action.results
            }, 
            time: action.time
        }

        default: 
            return state; 
    }
}

export default chats; 