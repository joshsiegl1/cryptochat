import { GET_USER_GROUPS, 
         CREATE_MESSAGE_GROUP, 
         GET_MESSAGES, 
         POST_MESSAGE } 
from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

import {AsyncStorage} from 'react-native'; 

const getMessageSuccess = (group, content) => { 
    return { 
        type: types.GET_MESSAGES, 
        id: group, 
        messages: content.messages, 
        time: content.time
    }
}

export const GetMessages = (group) => async (dispatch) => { 

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'get', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }
    }

    let url = GET_MESSAGES.replace(":group", group); 

    let { json } = await callApi(url, options); 

    dispatch(getMessageSuccess(group, json)); 
}

export const PostMessage = (id, userID, message) => async (dispatch) => { 
    let m = { 
        id, 
        userID, 
        body: message
    }

    let token = await AsyncStorage.getItem('token'); 

    let options = { 
        method: 'post', 
        headers: { 
            'Content-Type' : 'application/json', 
            'cryptochat-token-x' : token
        }, 
        body: JSON.stringify(m)
    }

    const { json } = await callApi(POST_MESSAGE, options); 
}

export const ClearNewUserGroup = () => async (dispatch) => { 
    dispatch({
        type: types.SWITCH_TO_NEW_USERGROUP, 
        newUserGroup: {}
    })
}

export const CreateMessageGroup = (messageNumbers) => async (dispatch) => { 
    let reqbody = { 
        phoneNumbers: messageNumbers
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

    if (json.Error) { 
        Alert.alert("Error", "Could not create a message at this time"); 
    }
    else if (json) { 
        dispatch({
            type: types.SWITCH_TO_NEW_USERGROUP, 
            newUserGroup: json.userGroup
        })
    }
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

    if (json.Error) { 
        Alert.alert("Error", "Could not recieve messages at this moment, please try again later"); 
    }
    else if (json) { 
        dispatch({
            type: types.GET_USERGROUPS, 
            userGroups: json
        })
    }
}