import * as types from '../constants/ActionTypes'; 

const initialState = { 
    currencies: null, 
    others: null
}

const cryptocurrency = (state = initialState, action) => { 
    switch (action.type) { 
        case types.GET_CURRENCIES: 
        return {
            ...state, 
            currencies: action.currencies
        }

        case types.GET_OTHERS: 
        return { 
            ...state, 
            others: action.others
        }

        default: 
            return state; 
    }
}

export default cryptocurrency; 