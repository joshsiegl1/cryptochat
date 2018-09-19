import * as types from '../constants/ActionTypes'; 

const initialState = { 
    user: null, 
    userGroups: null, 
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

        case types.DELETE_USER: 
        return {
            ...state, 
            user: null
        }

        case types.GET_USER: 
            return { 
                ...state, 
                user: action.user
            }

        case types.GET_USERGROUPS: 
            return { 
                ...state, 
                userGroups: action.userGroups
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