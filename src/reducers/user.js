import * as types from '../constants/ActionTypes'; 

const initialState = { 
    user: {}, 
    likedPosts: [], 
    dislikedPosts: []
}

const user = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_PHONE: 
            return { 
                ...state, 
                phone: action.phone
            }
        
        case types.LIKED_POSTS: 
            return { 
                ...state, 
                likedPosts: action.likedPosts, 
                dislikedPosts: action.dislikedPosts
            }

            default: 
                return state; 
    }
}

export default user; 