import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {StyleSheet, View, TouchableOpacity, TextInput, Text, Alert} from 'react-native'; 

const propTypes = { 
    SubmitCode: PropTypes.func, 
    phone: PropTypes.string
}

class PhoneCode extends Component { 
    constructor(props) { 
        super(props); 

        this.state = { 
            codeDigits: []
        }
    }

    componentWillReceiveProps(nextProps) { 
        const {phone} = nextProps; 
        if (phone !== '' && phone !== undefined) { 
            this.props.navigation.navigate("App"); 
        }
    }

    getCode = () => { 
        const { codeDigits } = this.state; 
        let ret = "invalid"; 
        if (codeDigits.length >= 5)
        { 
            ret = ""; 
            for (let i = 0; i < codeDigits.length; i++) { 
                ret += codeDigits[i].toString(); 
            }
            return ret; 
        }
        else return ret; 
    }

    _onDonePressed = () => { 
        const { SubmitCode } = this.props; 
        let code = this.getCode(); 
        if (code !== "invalid")
        { 
            SubmitCode(code); 
        }
        else { 
            Alert.alert("The code field is blank", "Please enter the code that we sent you"); 
        }
    }

    renderCodeDigits = () => { 
        let items = []; 
        for (let i = 0; i < 5; i++) { 
            let itemName = 'TextInput' + i.toString(); 
            let nextItem = (i === 4) ? 'TextInput0' : 'TextInput' + (i + 1).toString(); 
            items.push(<View style={{
                borderLeftWidth: 1, 
                borderRightWidth: 1, 
                borderBottomWidth: 1, 
                borderTopWidth: 1, 
                borderColor: 'lightgray', 
                margin: 5
            }}>
                <TextInput
                ref={input => this[itemName] = input}
                keyboardType='numeric' 
                maxLength={1}
                onChangeText={(text) => { 
                    this[nextItem].focus(); 

                    let { codeDigits } = this.state; 
                    codeDigits[i] = text; 
                    this.setState({codeDigits}); 
                }} 
                style={{
                    textAlign: 'center', 
                    height: 50, 
                    width: 50, 
                    backgroundColor: '#ffffff', 
                    padding: 10
                }}/>
            </View>)
        }
        return (items)
    }

    render() { 

        let codeDigits = this.renderCodeDigits(); 

        return (<View style={styles.main}> 
                <View style={styles.textContainer}>
                <Text style={styles.headerText}>Phone Number Verification</Text>

                <View style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                }}> 
                    {codeDigits}
                </View>

                <Text style={{color: 'lightgray', textAlign: 'center', paddingTop: 20}}>Please enter the verification code you should have receieved via SMS, if you did not receive this code,</Text>

                <View style={{paddingTop: 50}}>
                <TouchableOpacity style={styles.doneButton} onPress={this._onDonePressed}>
                    <Text style={{color: 'white', fontSize: 18}}>Done</Text>
                </TouchableOpacity>
                </View>

                </View>
                </View>)
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
        alignItems: 'center'
    }, 
    headerText: { 
        fontSize: 22, 
        color: 'black',
        paddingBottom: 20 
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

PhoneCode.propTypes = propTypes; 

module.exports = PhoneCode; 