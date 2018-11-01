import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, KeyboardAvoidingView, 
        StyleSheet, TouchableOpacity, ScrollView, Image, Keyboard, 
        TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native'; 


class NewMessage extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            numbers: [], 
            phonenumber: ""
        }
    }

    onAddPressed = () => { 
        let numbers = this.state.numbers; 
        numbers.push(this.state.phonenumber); 

        this.setState({numbers, phonenumber: ""}); 
    }

    onDonePressed = () => { 

    }

    render() { 

        let displayDone = this.state.numbers.length > 0 ? true : false; 

        return (<View style={styles.main}>
                <View style={styles.inputView}>
                    <Text style={styles.usernameText}>Username</Text>
                    <TextInput style={styles.input}
                           placeholder={"Search Phone Number"}
                           value={this.state.phonenumber}
                           onChangeText={(text) => this.setState({phonenumber: text})}/>
                </View>
                <View style={{
                    marginTop: 25, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <Text style={styles.instructionText}>
                        Search a phone number to add to the chat group
                    </Text>
                    <TouchableOpacity style={[styles.addButton, {marginTop: 25}]} onPress={this.onAddPressed}>
                        <Text style={{color: 'white'}}>Add</Text>
                    </TouchableOpacity>
                    {displayDone && (
                    <TouchableOpacity style={[styles.addButton, {marginTop: 25}]} onPress={this.onDonePressed}>
                        <Text style={{color: 'white'}}>Done</Text>
                    </TouchableOpacity>)}
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    usernameText: { 
        alignSelf: 'center', 
        height: 50, 
        lineHeight: 50, 
        marginRight: 10, 
        textAlign: 'center', 
        color: 'gray'
    }, 
    input: { 
        width: '100%', 
        paddingLeft: 10
    }, 
    instructionText: { 
        color: 'gray'
    }, 
    addButton: { 
        width: 200, 
        height: 50, 
        backgroundColor: '#373F51', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#373F51'
    }, 
    inputView: { 
        marginTop: 50, 
        width: '100%', 
        height: 50, 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        padding: 10, 
        textAlign: 'center', 
        alignItems: 'center'
    }
})

NewMessage.propTypes = { }; 

export default NewMessage; 