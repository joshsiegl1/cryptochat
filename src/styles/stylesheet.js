import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        borderColor: 'black', 
        borderBottomWidth: 1, 
        backgroundColor: 'white', 
        padding: 5
    }, 
    cryptoButtonText: { 
        paddingLeft: 10, 
        paddingTop: 5
    }, 
    touchableOpacity: { 
        width: '100%'
    }, 
    chatBox: { 
        width: '100%', 
        borderColor: 'black', 
        borderWidth: 1
    }, 
    messageBox: { 
        width: '100%', 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderColor: 'black', 
        borderLeftWidth: 10, 
        borderLeftColor: 'red', 
    }, 
    messageText: { 
        paddingLeft: 10, 
        paddingTop: 5, 
        paddingBottom: 5
    }
})

export default styles; 