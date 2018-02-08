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
        borderWidth: 1, 
        borderColor: 'black', 
        borderLeftWidth: 10, 
        borderLeftColor: 'red', 
        paddingBottom: 5, 
        paddingLeft: 1, 
        paddingRight: 1
    }
})

export default styles; 