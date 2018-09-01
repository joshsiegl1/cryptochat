export const pushNotification = (expToken) => { 

    let body = {
        'to' : expToken, 
        'sound' : 'default', 
        'body' : 'Someone has replied to your post'
    }

    request({
        url: 'https://exp.host/--/api/v2/push/send', 
        method: 'POST', 
        headers: { 
            'accept' : 'application/json',           
            'accept-encoding' : 'gzip, deflate', 
            'content-type': 'application/json', 
        }, 
        json: true, 
        body: body
    }, function (error, response, body) { 
        console.log(response); 
    })
}