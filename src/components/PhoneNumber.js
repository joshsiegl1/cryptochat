import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text, StyleSheet} from 'react-native'; 

import PhoneInput from 'react-native-phone-input'; 
import CountryPicker from 'react-native-country-picker-modal'; 

const propTypes = { }

class PhoneNumber extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            cca2: 'US'
        }
    }

    _onNumberChanged = () => { 

    }

    onPressFlag = () => { 
        this.countryPicker.openModal();  
    }

    selectCountry = (country) => { 
        this.phone.selectCountry(country.cca2.toLowerCase()); 
        this.setState({ cca2: country.cca2 }); 
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
                    textStyle={{
                        backgroundColor: 'lightgray', 
                        padding: 5, 
                        fontSize: 20,
                        height: 30 

                    }}
                    flagStyle={{
                        width: 50, 
                        height: 30
                    }}
                    offset={20}
                    />

                <View style={{marginTop: 20}}>
                <CountryPicker
                    ref={(ref) => { 
                        this.countryPicker = ref; 
                    }}
                    onChange={value => this.selectCountry(value)}
                    translation="eng"
                    cca2={this.state.cca2}
                >
                <View />
                </CountryPicker>
                </View>

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
        color: 'black', 
        paddingBottom: 20
    }
})

PhoneNumber.propTypes = propTypes; 

export default PhoneNumber; 

