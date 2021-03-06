import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        backgroundColor: 'white', 
        padding: 10
    }, 
    cryptoButtonText: { 
        paddingLeft: 10, 
        fontFamily: 'open-sans-semi-bold', 
        lineHeight: 24
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
        width: '100%', 
        backgroundColor: 'white', 
        borderBottomWidth: 10, 
        borderColor: '#F0EFF5', 
    }, 
    titleBox: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    }, 
    bodyBox: { 
        paddingTop: 10
    }, 
    voteBox: { 
        paddingTop: 20, 
        paddingBottom: 10, 
        paddingLeft: 20
    }, 
    voteSection: { 
        display: 'flex', 
        flexDirection: 'row'
    }, 
    timeSection: { 
        display: 'flex', 
        flexDirection: 'row'
    },
    commentSection: { 
        display: 'flex', 
        flexDirection: 'row'
    }, 
    messageText: { 
        paddingLeft: 21, 
        fontFamily: 'arial'
    }
})

export default styles; 