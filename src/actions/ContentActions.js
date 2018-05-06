import { SIGN_LINK_URL } from '../constants/ApiConstants'; 

import * as types from '../constants/ActionTypes'; 
import {callApi} from '../utils/ApiUtils'; 

const uploadFile = ( file, signedRequest, url) => { 
    // const xhr = new XMLHttpRequest(); 
    // xhr.open('PUT', signedRequest); 
    // xhr.onreadystatechange = () => { 
    //     if (xhr.readyState === 4) { 
    //         if (xhr.status === 200) { 
    //             //THis is where we'll point to the files location
    //         }
    //     }
    // }; 
    // xhr.send(file); 

    const options = { 
        method: 'PUT', 
        body: file
    }; 

    fetch(signedRequest, options)
        .then(response => { 
            if (!response.ok) { 
                console.log(response); 
            }
        })
}

export const getSignedRequest = (fileName, type, uri) => async (dispatch) => { 
    const xhr = new XMLHttpRequest(); 
    let url = SIGN_LINK_URL.replace(":filename", fileName).replace(":filetype", type); 
    xhr.open('GET', url); 
    xhr.onreadystatechange = () => { 
        if (xhr.readyState === 4) { 
            if (xhr.status === 200) { 
                const response = JSON.parse(xhr.responseText); 
                let file = new FormData(); 
                file.append(fileName, {uri: uri, name: fileName, type})
                uploadFile(file, response.signedRequest, response.url); 
            }
        }
    }
    xhr.send(); 
}
