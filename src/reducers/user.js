import * as types from '../constants/ActionTypes'; 

const initialState = { 
    user: {}
}

const user = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_USER: 
            return { 
                ...state, 
                user: action.user
            }

            default: 
                return state; 
    }
}

export default user; 