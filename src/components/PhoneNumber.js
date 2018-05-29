import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text, StyleSheet} from 'react-native'; 

import PhoneInput from 'react-native-phone-input'; 

const propTypes = { }

class PhoneNumber extends Component { 
    constructor(props) { 
        super(props)
    }

    _onNumberChanged = () => { 

    }

    onPressFlag = () => { 
        //this.myCountryPicker.open(); 
    }

    render() { 
        return (<View style={styles.main}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Your Phone Number</Text>
                <Text style={styles.subText}>Please enter your country code and phone number, we'll send you a text in a moment.</Text>

                <PhoneInput
                    ref={(ref) => { 
                        this.phone = ref; 
                    }}
                    onPressFlag={this.onPressFlag}
                    />
            </View>
        </View>); 
    }
}

const styles = StyleSheet.create({
    main: { 
        flex: 1, 
        backgroundColor: 'white'
    }, 
    textContainer: { 
        margin: 32,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    headerText: { 
        fontSize: 22, 
        color: 'black',
        paddingBottom: 20 
    }, 
    subText: { 
        fontSize: 16, 
        color: 'black'
    }
})

PhoneNumber.propTypes = propTypes; 

export default PhoneNumber; 

