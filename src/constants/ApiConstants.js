const COINMARKETCAP_API_HOSTNAME = 'https://api.coinmarketcap.com/v1'; 

export const GLOBAL_URL = `${COINMARKETCAP_API_HOSTNAME}/global/`; 
export const TICKER_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/`; 
export const TICKER_LIMIT_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/?limit=:limit`; 


const CRYPTOCHAT_API_HOSTNAME = 'https://obscure-coast-72434.herokuapp.com/'

export const POST_CHAT_URL = `${CRYPTOCHAT_API_HOSTNAME}/chat/`; 