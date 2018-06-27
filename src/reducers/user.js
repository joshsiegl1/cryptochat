import * as types from '../constants/ActionTypes'; 

const initialState = { 
    user: null, 
    validated: null, 
    phone: '', 
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
        
        case types.VALIDATE: 
            return { 
                ...state, 
                validated: action.validated
            }
        
        case types.UPDATE_PROFILE_PIC: 
            return { 
                ...state, 
                user: { 
                    ...state.user, 
                    profilepic: action.profilepic
                }
            }

        case types.GET_USER: 
            return { 
                ...state, 
                user: action.user
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