import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; 

import { SetPhone } from '../utils/UserStorage'; 

const propTypes = { 
    Phone: PropTypes.string
}

class Account extends Component { 
    constructor(props) { 
        super(props)
    }

    onLogoutPressed = async () => { 
        await SetPhone(""); 

        this.props.navigation.navigate("AuthLoading");   
    }

    onDeleteAccountPressed = async () => { 
        await SetPhone(""); 


        this.props.navigation.navigate("AuthLoading"); 
    }

    render() { 

        const { Phone } = this.props; 

        return(<View style={styles.main}>
            <Image source={require("../../assets/crypto-dude.png")}
             style={styles.photo} />
            <Text style={styles.numberText}>{Phone}</Text>
            <TouchableOpacity style={styles.accountButton} onPress={this.onLogoutPressed}>
                <Text style={styles.accountButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountButton} onPress={this.onDeleteAccountPressed}> 
                <Text style={styles.accountButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    photo: { 
        marginTop: 50, 
        width: 100, 
        height: 100, 
        borderRadius: 50 
    }, 
    numberText: { 
        color: 'black',
        fontSize: 18, 
        marginTop: 20
    }, 
    accountButton: { 
        width: '100%', 
        height: 40, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        backgroundColor: 'white', 
        padding: 10, 
        textAlign: 'center'
    }, 
    accountButtonText: { 
        color: 'lightgray', 
        paddingLeft: 10
    }
})

Account.propTypes = propTypes; 

export default Account; 