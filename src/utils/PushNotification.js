import { Permissions, Notifications} from 'expo'; 


export const registerForPushNotifications = async (phone) => { 
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    ); 
    let finalStatus = existingStatus; 

    if (existingStatus !== 'granted') { 
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); 
      finalStatus = status; 
    }

    if (finalStatus !== 'granted') { 
      return; 
    }

    let token = await Notifications.getExpoPushTokenAsync(); 

    return fetch('https://obscure-coast-72434.herokuapp.com/user/push-token', { 
        method: 'POST', 
        headers: { 
            Accept: 'application/json', 
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            token: token, 
            phone: phone
        })
    })
  }