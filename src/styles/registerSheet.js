import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    gradient: { 
        height: '100%', 
        flex: 1
    }, 
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around',  
        height: '100%', 
        alignItems: 'center', 
        paddingTop: 20, 
        paddingLeft: 50,
        paddingRight: 50
    }, 
    formContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%'
    }, 
    input: { 
        color: 'white', 
        borderColor: 'white', 
        borderWidth: 1, 
        borderRadius: 25, 
        marginTop: 5, 
        marginBottom: 5, 
        padding: 15, 
        width: '100%'
    }, 
    SectionStyle: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: 'white', 
        borderWidth: 0.5, 
        borderRadius: 25, 
        marginTop: 5, 
        marginBottom: 5, 
    },
    inputImageStyle: { 
        padding: 10, 
        margin: 10, 
        height: 25, 
        width: 25, 
        resizeMode: 'stretch', 
        alignItems: 'center'
    }, 
    registerText: { 
        marginBottom: 10, 
        fontSize: 18, 
        fontWeight: 'bold'
    }, 
    RegisterButton: { 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        borderColor: 'transparent', 
        borderWidth: 0.5, 
        borderRadius: 25, 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        padding: 15, 
        marginTop: 15, 
        marginBottom: 15, 
        width: '100%'
    }, 
    registerButtonText: { 
        color: 'white', 
        fontSize: 22, 
        fontWeight: 'bold'
    }
})

export default styles; 