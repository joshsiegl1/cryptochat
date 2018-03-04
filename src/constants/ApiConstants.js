const COINMARKETCAP_API_HOSTNAME = 'https://api.coinmarketcap.com/v1'; 

export const GLOBAL_URL = `${COINMARKETCAP_API_HOSTNAME}/global/`; 
export const TICKER_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/`; 
export const TICKER_LIMIT_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/?limit=:limit`; 

const CRYPTOCHAT_API_HOSTNAME = 'https://obscure-coast-72434.herokuapp.com'; 
const DEBUG_API_HOSTNAME = 'localhost:3000'; 

const DEBUG = false; 

const GET_CRYPTO_HOSTNAME = () => {
    if (DEBUG) { 
        return DEBUG_API_HOSTNAME
    }
    else { 
        return CRYPTOCHAT_API_HOSTNAME
    }
}

export const POST_CHAT_URL = `${GET_CRYPTO_HOSTNAME()}/chat/`;
export const GET_CHAT_URL = `${GET_CRYPTO_HOSTNAME()}/chat/:crypto`;  

export const ADD_USER_URL = `${GET_CRYPTO_HOSTNAME()}/user/`; 
export const GET_USER_URL = `${GET_CRYPTO_HOSTNAME()}/user/:name`; 
export const FACEBOOK_LOGIN_URL = `${GET_CRYPTO_HOSTNAME()}/user/facebookLogin`; 