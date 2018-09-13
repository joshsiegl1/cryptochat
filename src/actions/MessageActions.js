import { GET_USER_GROUPS, CREATE_MESSAGE_GROUP} from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

import {AsyncStorage} from 'react-native'; 

export const CreateMessageGroup = (messageNumber) => async (dispatch) => { 
    let reqbody = { 
        messageNumber
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(reqbody)
    }

    const { json } = await callApi(CREATE_MESSAGE_GROUP, options); 
}

export const GetUserGroups = () => async (dispatch) => { 
    
    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'get', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }
    }

    const { json } = await callApi(GET_USER_GROUPS, options); 
}