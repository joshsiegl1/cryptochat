import { AsyncStorage } from 'react-native'; 

export const SetItem = async (key, item) => { 
    try { 
        await AsyncStorage.setItem(key, item); 
    }
    catch (e) { 
        console.log(e) 
    }
}

export const GetItem = async (key) => { 
    try { 
        await AsyncStorage.getItem(key); 
    }
    catch (e) { 
        console.log(e) 
    }
}

export const SetUser = async (userID, email, karma) => { 
    try { 
        await AsyncStorage.multiSet([
        ['userID', userID], 
        ['email', email], 
        ['karma', karma.toString()]]); 
    }
    catch (e) { 
        console.log(e); 
    }
}

export const GetUser = async (fn) => { 
    try { 
        await AsyncStorage.multiGet([
            'userID', 
            'email', 
            'karma'
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
        console.log(e); 
    }
}

