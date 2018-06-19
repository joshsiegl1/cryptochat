import { AsyncStorage } from 'react-native'; 

export const SetPhone = async (phone) => { 
    try { 
        await AsyncStorage.setItem("phone", phone); 
    }
    catch (e) { 

    }
}

export const GetPhone = async () => { 
    try { 
        await AsyncStorage.getItem("phone"); 
    }
    catch (e) { 

    }
}

export const SetToken = async (token) => { 
    try { 
        await AsyncStorage.setItem("token", token); 
    }
    catch (e) { 

    }
}