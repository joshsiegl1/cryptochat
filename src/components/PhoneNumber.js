import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native'; 

import { CheckBox } from 'react-native-elements'; 

import PhoneInput from 'react-native-phone-input'; 
import CountryPicker from 'react-native-country-picker-modal'; 
import { LinearGradient } from 'expo'; 

const propTypes = { 
    SendCode: PropTypes.func
}

class PhoneNumber extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            cca2: 'US', 
            help: false, 
            eula: false
        }
    }

    onDonePressed = () => { 
        const { SendCode } = this.props; 
        const { navigate } = this.props.navigation;
        if (this.state.eula) { 
            if (this.phone.isValidNumber()) { 
                SendCode(this.phone.getValue(), this.state.help); 
                navigate("PhoneCode"); 
            }
            else { 
                Alert.alert("Invalid Number", "The Number provided appears to be invalid, please double check it");
            }
        }
        else { 
            Alert.alert("Terms of Service", "You must agree to the terms of service as outlined in the EULA"); 
        }
    }

    onPressFlag = () => { 
        this.countryPicker.openModal();  
    }

    selectCountry = (country) => { 
        this.phone.selectCountry(country.cca2.toLowerCase()); 
        this.setState({ cca2: country.cca2 }); 
    }

    onTermsPressed = () => { 
        const { navigate } = this.props.navigation; 

        navigate("Web", {url: "http://www.cryptochatapp.org/html-eula.html"}); 
    }

    render() { 
        return (<View style={styles.main}>
        <LinearGradient 
        colors={['#FFC800', '#EDCD61']}
        style={styles.top}>
            <Image style={{width: 100, height: 100, marginTop: 120}} source={require('../../assets/verify_message.png')} />
        </LinearGradient>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Enter Your Phone Number</Text>
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
                {/* <CheckBox title="Yes, I'd like to help make Cryptochat better. Allow the creator to text me asking for input and feedback."
                          checked={this.state.help} 
                          onPress={() => this.setState({help: !this.state.help})}/> */}
                <Text style={{padding: 10}}>Please read through the <Text style={{color: 'blue'}} onPress={this.onTermsPressed}>Terms of Service</Text></Text>
                <CheckBox title="I agree to the Terms of Service as outlined in the EULA"
                          checked={this.state.eula}
                          onPress={() => this.setState({eula: !this.state.eula})} />
                </View>
            
            <View style={{paddingTop: 50}}>
            <TouchableOpacity style={styles.doneButton} onPress={this.onDonePressed}>
                <Text style={{color: 'white', fontSize: 18}}>Done</Text>
            </TouchableOpacity>
            </View>
            </View>
            </TouchableWithoutFeedback>
        </View>); 
    }
}

const styles = StyleSheet.create({
    main: { 
        flex: 1, 
        backgroundColor: 'white'
    }, 
    top: { 
        margin: 0, 
        padding: 0, 
        width: '100%', 
        height: 150, 
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center', 
        marginBottom: 25
    }, 
    textContainer: { 
        margin: 32,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    headerText: { 
        fontSize: 20, 
        color: 'gray',
        paddingBottom: 20 
    }, 
    subText: { 
        fontSize: 14, 
        color: 'lightgray', 
        paddingBottom: 40
    }, 
    doneButton: { 
        width: 200, 
        height: 50, 
        backgroundColor: '#373F51', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#373F51'
    }
})

PhoneNumber.propTypes = propTypes; 

export default PhoneNumber; 

