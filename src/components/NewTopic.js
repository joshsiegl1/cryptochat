import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, KeyboardAvoidingView, 
    StyleSheet, TouchableOpacity, ScrollView, Image, Keyboard, 
    TouchableWithoutFeedback } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown'; 

const propTypes = { }

class NewTopic extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            name: "", 
            description: "", 
            photo: "", 
            category: "", 
            type: "",
        }
    }

    render() { 
        return (
        <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={-10}>
        <TouchableWithoutFeedback style={{height: 10000}} onPress={Keyboard.dismiss} accessible={false}>

            <ScrollView style={styles.scrollView}>
            <View style={styles.centered}>
                <Image style={styles.image} 
                        source={require("../../assets/camera_icon.png")} />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Name</Text>
                <TextInput style={styles.input}
                           placeholder={"Name"}/>
            </View>
            <View style={styles.inputView}>
            <Text style={styles.text}>Channel Description</Text>
                <TextInput style={styles.input}
                           placeholder={"Description"}
                           multiline={true}/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Category</Text>
                <ModalDropdown  style={{width: '60%', padding: 10}}
                                dropdownStyle={{width: '60%'}}
                                textStyle={styles.dropdownText}
                                onSelect={(option) => this.setState({category: option})}
                                options={['Cryptocurrency', 'Company', 'Wallet', 'General']}/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.text}>Channel Type</Text>
                <ModalDropdown style={{width: '60%', padding: 10}}
                                dropdownStyle={{width: '60%'}}
                                textStyle={styles.dropdownText}
                                onSelect={(option) => this.setState({type: option})}
                                options={['Public', 'Read-Only', 'Private']}/>
            </View>

            <View style={styles.centered}>
            <TouchableOpacity style={[styles.doneButton, {marginTop: 25}]} onPress={this.onDonePressed}> 
                            <Text style={{color: 'white'}}>Launch</Text>
                        </TouchableOpacity>
            </View>
            
            </ScrollView>
        
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>)
    }
}


const styles = StyleSheet.create({
    scrollView: { 
        height: '100%'
    }, 
    centered: { 
        width: '100%', 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center'
    }, 
    image: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginTop: 25
    }, 
    inputView: { 
        marginTop: 25, 
        width: '100%', 
        //height: 50, 
        padding: 5, 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        textAlign: 'center', 
        alignItems: 'center'
    }, 
    dropdownText: { 
        color: 'black', 
        fontSize: 14, 
        lineHeight: 50
    }, 
    text: { 
        justifyContent: 'flex-start', 
        //alignSelf: 'center', 
        height: 50, 
        lineHeight: 50, 
        marginRight: 10, 
        //textAlign: 'center', 
        color: 'gray', 
        width: '40%'
    }, 
    input: { 
        width: '60%', 
        padding: 10 
    }, 
    doneButton: { 
        width: 200, 
        height: 50, 
        backgroundColor: '#373F51', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius:10, 
    }
})

NewTopic.propTypes = propTypes; 

export default NewTopic; 