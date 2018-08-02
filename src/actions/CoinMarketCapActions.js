
import { TICKER_LIMIT_URL, OTHERS_URL, GLOBAL_MAP_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

import { cmc_apikey } from '../aws_config'; 

const fetchTopFiftySuccess = (result) => { 
    return { 
        type: types.GET_CURRENCIES, 
        currencies: result
    }
}

export const fetchTopFiftyCryptoCurrencies = () => async (dispatch) => { 

    const { json } = await callApi(TICKER_LIMIT_URL.replace(':limit', 100)); 
    dispatch(fetchTopFiftySuccess(json)); 
}

export const fetchCryptoCurrencies = () => async (dispatch) => { 
    
    let options = { 
        method: 'get', 
        headers: {
            'Content-Type' : 'application/json', 
            'X-CMC_PRO_API_KEY' : cmc_apikey
        }
    }

    const { json } = await callApi(GLOBAL_MAP_URL, options); 

    dispatch({
        type: types.GET_CURRENCIES, 
        currencies: json.data
    })
}

const fetchOthersSuccess = (result) => { 
    return { 
        type: types.GET_OTHERS, 
        others: result
    }
}

export const fetchOthers = () => async (dispatch) => { 

    const { json } = await callApi(OTHERS_URL); 
    dispatch(fetchOthersSuccess(json.items)); 
}