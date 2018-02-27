import { StyleSheet } from 'react-native'

const userStyleSheet = StyleSheet.create({
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'white', 
        height: '100%', 
        alignItems: 'center', 
        paddingTop: 20, 
        paddingLeft: 20,
        paddingRight: 20
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
    }, 
    LoginButton: { 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5, 
        backgroundColor: 'darkgreen', 
        padding: 15, 
        marginTop: 5, 
        marginBottom: 5, 
        width: '100%'
    }, 
    loginButtonText: { 
        color: 'white', 
        fontSize: 22, 
        fontWeight: 'bold'
    }
})

export default userStyleSheet; 