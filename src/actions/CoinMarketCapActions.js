
import { TICKER_LIMIT_URL } from '../constants/ApiConstants'; 
import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

const fetchTopFiftySuccess = (result) => { 
    return { 
        type: types.GET_CURRENCIES, 
        currencies: result
    }
}

export const fetchTopFiftyCryptoCurrencies = () async (dispatch) => { 
    const json = await callApi(TICKER_LIMIT_URL.replace(':limit', 50)); 
    dispatch(fetchTopFiftySuccess(json)); 
}