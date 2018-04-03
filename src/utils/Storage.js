import { AsyncStorage } from 'react-native'; 

export const SetItem = async (key, item) => { 
    try { 
        await AsyncStorage.setItem(key, item); 
    }
    catch (e) { 
        //console.log(e) 
    }
}

export const GetItem = async (key) => { 
    try { 
        await AsyncStorage.getItem(key); 
    }
    catch (e) { 
        //console.log(e) 
    }
}

export const SetUser = async (userID, email, karma, fbid) => { 
    try { 
        await AsyncStorage.multiSet([
        ['userID', userID], 
        ['email', email], 
        ['karma', karma.toString()], 
        ['fbid', fbid]]); 
    }
    catch (e) { 
        //console.log(e); 
    }
}

export const GetUser = async (fn) => { 
    try { 
        await AsyncStorage.multiGet([
            'userID', 
            'email', 
            'karma', 
            'fbid'
        ], (err, values) => { 
            if (values.length > 0)
            {
                if (values[0][1] === null)
                    fn(undefined); 
                else fn(values); 
            }
            else fn(undefined); 
        })
    }
    catch (e) { 
        //console.log(e); 
    }
}

export const DeleteUser = async () => { 
    try { 
        let keys = ['userID', 'email', 'karma', 'fbid']
        await AsyncStorage.multiRemove(keys, (err) => { 
            //console.log(err); 
        })
    }
    catch (e) { 
        //console.log(e) 
    }
}

