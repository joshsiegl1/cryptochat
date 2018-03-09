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
    chatButton: { 
        width: '20%', 
        height: '100%', 
        backgroundColor: 'white'
    },
    messageBox: { 
        padding: 5, 
        height: 80,
        width: '100%', 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderColor: 'gray', 
    }, 
    titleBox: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    }, 
    messageText: { 
        paddingLeft: 21
    }
})

export default styles; 