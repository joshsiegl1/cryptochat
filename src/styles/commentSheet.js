import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({
    contentContainer: { 
        backgroundColor: 'white', 
        borderColor: 'lightgray', 
        borderBottomWidth: 2, 
        padding: 20
    }, 
    replyBox: { 
        padding: 5, 
        width: '100%', 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderColor: 'lightgray'
    }, 
    replyTitleBox: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    }, 
    chatButton: { 
        width: '20%', 
        height: '100%', 
        backgroundColor: 'white'
    },
})

export default styles; 