import * as types from '../constants/ActionTypes'; 

const initialState = { 
    currencies: null
}

const cryptocurrency = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_CURRENCIES: 
        return {
            ...state, 
            currencies: action.currencies
        }

        default: 
            return state; 
    }
}

export default cryptocurrency; 