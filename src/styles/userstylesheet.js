import { StyleSheet } from 'react-native'

const userStyleSheet = StyleSheet.create({
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'white', 
        height: '100%', 
        alignItems: 'center'
    }, 
    general: { 
        padding: 5
    }, 
    form: { 
        paddingTop: 20
    }, 
    loginText: { 
        fontSize: 24, 
        fontWeight: 'bold'
    }, 
    input: { 
        borderColor: 'lightgray', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginTop: 5, 
        marginBottom: 5, 
        padding: 15, 
        width: '100%'
    }
})

export default userStyleSheet; 