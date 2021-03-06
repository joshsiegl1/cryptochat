import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({
    topBar: { 
        flex: 1, 
        backgroundColor: 'white', 
        width: '100%', 
        padding: 20, 
        flexDirection: 'row', 
    },
    sendText: { 
        fontSize: 18, 
        color: '#373F51',
        fontWeight: 'bold'
    },
    sendImage: { 
        width: 24, 
        height: 24,
    }, 
    topic: { 
        backgroundColor: 'white', 
        padding: 20
    }, 
    topicInner: {  
        backgroundColor: 'white',
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        paddingBottom: 20
    }, 
    
    topicText: { 
        fontSize: 22
    }, 
    textInput: { 
        height: '100%', 
        fontSize: 18, 
        backgroundColor: 'white', 
        padding: 20
    }
})

export default styles; 