import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {StyleSheet, View, TouchableOpacity, TextInput, Text, Alert} from 'react-native'; 

const propTypes = { 
    SubmitCode: PropTypes.func, 
    user: PropTypes.string
}

class PhoneCode extends Component { 
    constructor(props) { 
        super(props); 

        this.state = { 
            code: ''
        }
    }

    componentWillReceiveProps(nextProps) { 
        const {user} = nextProps; 
        if (user !== '' && user !== undefined) { 
            this.props.navigation.navigate("App"); 
        }
    }

    _onDonePressed = () => { 
        let code = this.state.code; 
        if (code !== '') { 
            const {SubmitCode} = this.props; 

            SubmitCode(code); 
        }
        else { 
            Alert.alert("The code field is blank", "Please enter the code that we sent you"); 
        }
    }

    render() { 
        return (<View style={styles.main}> 
                <View style={styles.textContainer}>
                <Text style={styles.headerText}>Enter Your Code</Text>

                <TextInput 
                style={{paddingTop: 20, width: 200, height: 20, borderColor: 'black', borderWidth: 1}}
                value={this.state.code}
                onChangeText={(text) => this.setState({code: text})}
                keyboardType='numeric' />

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