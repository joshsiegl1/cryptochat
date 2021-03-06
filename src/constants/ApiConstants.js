const COINMARKETCAP_API_HOSTNAME = 'https://api.coinmarketcap.com/v1'; 
const PRO_COINMARKETCAP_API_HOSTNAME = 'https://pro-api.coinmarketcap.com/v1'; 

export const GLOBAL_URL = `${COINMARKETCAP_API_HOSTNAME}/global/`; 
export const TICKER_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/`; 
export const TICKER_LIMIT_URL = `${COINMARKETCAP_API_HOSTNAME}/ticker/?limit=:limit`; 

export const GLOBAL_MAP_URL = `${PRO_COINMARKETCAP_API_HOSTNAME}/cryptocurrency/listings/latest`; 

const CRYPTOCHAT_API_HOSTNAME = 'https://obscure-coast-72434.herokuapp.com'; 
const DEBUG_API_HOSTNAME = 'https://cryptochat-test.herokuapp.com'; 
//heroku git:remote -a cryptochat-test

const DEBUG = false; 

const GET_CRYPTO_HOSTNAME = () => {
    if (DEBUG) { 
        return DEBUG_API_HOSTNAME
    }
    else { 
        return CRYPTOCHAT_API_HOSTNAME
    }
}

export const OTHERS_URL = `${GET_CRYPTO_HOSTNAME()}/others`; 

export const PUSH_ENDPOINT = `${GET_CRYPTO_HOSTNAME()}/user/push-token`; 

export const POST_CHAT_URL = `${GET_CRYPTO_HOSTNAME()}/chat/`;
export const POST_REPLY_URL = `${GET_CRYPTO_HOSTNAME()}/reply/`; 
export const GET_CHAT_URL = `${GET_CRYPTO_HOSTNAME()}/chat/:crypto`;  

export const UPVOTE_URL = `${GET_CRYPTO_HOSTNAME()}/user/upvote/`; 
export const DOWNVOTE_URL = `${GET_CRYPTO_HOSTNAME()}/user/downvote/`; 
export const VOTE_URL = `${GET_CRYPTO_HOSTNAME()}/user/vote/`; 
export const ADD_USER_URL = `${GET_CRYPTO_HOSTNAME()}/user/`; 
export const GET_USER_URL = `${GET_CRYPTO_HOSTNAME()}/user/get/:name`; 
export const FACEBOOK_LOGIN_URL = `${GET_CRYPTO_HOSTNAME()}/user/facebookLogin`; 
export const UPDATE_USERNAME_FACEBOOK_URL = `${GET_CRYPTO_HOSTNAME()}/user/updateUsernameFacebook`;
export const GET_POST_URL = `${GET_CRYPTO_HOSTNAME()}/post/:postID`;  
export const GET_REPLY_URL = `${GET_CRYPTO_HOSTNAME()}/replies/:postID`; 
export const UPDATE_USERNAME = `${GET_CRYPTO_HOSTNAME()}/user/updateusername`; 
export const UPDATE_PROFILE_PIC = `${GET_CRYPTO_HOSTNAME()}/user/updateprofilepic`; 
export const GET_USER = `${GET_CRYPTO_HOSTNAME()}/user`; 
export const DELETE_USER = `${GET_CRYPTO_HOSTNAME()}/user/delete`; 
export const BLOCK_POST = `${GET_CRYPTO_HOSTNAME()}/user/blockpost`; 
export const FLAG_POST = `${GET_CRYPTO_HOSTNAME()}/user/flagpost`; 
export const BLOCK_USER = `${GET_CRYPTO_HOSTNAME()}/user/blockuser`; 
export const UNBLOCK_USER = `${GET_CRYPTO_HOSTNAME()}/user/unblockuser`; 
export const DELETE_POST = `${GET_CRYPTO_HOSTNAME()}/user/deletepost`; 
export const GET_USER_GROUPS = `${GET_CRYPTO_HOSTNAME()}/message/usergroups`; 
export const CREATE_MESSAGE_GROUP = `${GET_CRYPTO_HOSTNAME()}/message/creategroup`; 
export const GET_MESSAGES = `${GET_CRYPTO_HOSTNAME()}/message/message/:group`; 
export const POST_MESSAGE = `${GET_CRYPTO_HOSTNAME()}/message/message`; 

export const ADD_CATEGORY = `${GET_CRYPTO_HOSTNAME()}/content/category`; 

export const POST_LINK_URL = `${GET_CRYPTO_HOSTNAME()}/content/link`; 
export const SIGN_LINK_URL = `${GET_CRYPTO_HOSTNAME()}/content/sign_s3?file-name=:filename&file-type=:filetype`

export const SEND_CODE = `${GET_CRYPTO_HOSTNAME()}/phone`; 
export const SUBMIT_CODE = `${GET_CRYPTO_HOSTNAME()}/phone/submit`
export const VALIDATE_TOKEN = `${GET_CRYPTO_HOSTNAME()}/phone/validate`; 