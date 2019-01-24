import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { parsePhoneNumber } from 'libphonenumber-js'; 

import { View, Text, TextInput, KeyboardAvoidingView, 
        StyleSheet, TouchableOpacity, ScrollView, Image, Keyboard, 
        TouchableWithoutFeedback, Alert, ActivityIndicator, FlatList } from 'react-native'; 


class NewMessage extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            numbers: [], 
            phonenumber: ""
        }
    }

    onAddPressed = () => { 

        try { 
            let number = parsePhoneNumber(this.state.phonenumber, 'US'); 

            let numbers = this.state.numbers; 
            numbers.push(number.format("INTERNATIONAL")); 

            this.setState({numbers, phonenumber: ""}); 
        }
        catch (e) { 
            Alert.alert("Invalid Phone Number", "That phone number is not valid"); 

            this.setState({phonenumber: ""}); 
        }
    }

    ///TODO
    //make this async, wait for the group to be created, then navigate to newly created group
    onDonePressed = () => { 
        const { CreateMessageGroup, navigation } = this.props; 

        CreateMessageGroup(this.state.numbers); 

        navigation.navigate('List'); 
    }

    _removeItem = (item) => { 
        let numbers = this.state.numbers; 
        let index = this.state.numbers.indexOf(item); 
        numbers.splice(index, 1); 
        this.setState({numbers}); 
    }

    _renderItem = ({item}) => (
        <View style={styles.numberView}>
            <Text>
                {item}
            </Text>
            <TouchableOpacity onPress={() => this._removeItem(item)}>
                <Image style={styles.remove} source={require("../../assets/remove.png")} />
            </TouchableOpacity>
        </View>
    )

    _keyExtractor = (item, index) => item; 

    formatPhoneNumber = (phoneNumberString) => { 
        const number = parsePhoneNumber(phoneNumberString); 
        return number.format("INTERNATIONAL"); 
    }

    render() { 

        let displayDone = this.state.numbers.length > 0 ? true : false; 

        return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.main}>
                <FlatList data={this.state.numbers}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                          style={{width: '100%', maxHeight: 200, borderBottomColor: 'lightgray', borderBottomWidth: 1}}
                />
                <View style={styles.inputView}>
                    <Text style={styles.usernameText}>Phone Number</Text>
                    <TextInput style={styles.input}
                           placeholder={"Add a phone number"}
                           value={this.state.phonenumber}
                           onChangeText={(text) => this.setState({phonenumber: text})}/>
                </View>
                <View style={{
                    marginTop: 25, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <Text style={styles.instructionText}>
                        Add a phone number to the group chat, please be sure to include the international codes. ( +1 for the US for example )
                    </Text>
                    <TouchableOpacity style={[styles.addButton, {marginTop: 25}]} onPress={this.onAddPressed}>
                        <Text style={{color: 'white'}}>Add</Text>
                    </TouchableOpacity>
                    {displayDone && (
                    <TouchableOpacity style={[styles.addButton, {marginTop: 25}]} onPress={this.onDonePressed}>
                        <Text style={{color: 'white'}}>Create Group</Text>
                    </TouchableOpacity>)}
                </View>
            </View>
            </TouchableWithoutFeedback>)
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
        color: 'gray', 
        padding: 5
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
        width: '100%', 
        height: 50, 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        padding: 10, 
        textAlign: 'center', 
        alignItems: 'center'
    }, 
    numberView: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 5, 
        backgroundColor: 'white', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        width: '100%'
    }, 
    remove: { 
        width: 15, 
        height: 15
    }, 
})

NewMessage.propTypes = { }; 

export default NewMessage; 