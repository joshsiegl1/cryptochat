import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'; 

const propTypes = { 
    UpdateUsername: PropTypes.func, 
    user: PropTypes.shape({})
}

class UpdateForm extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            username: ""
        }
    }

    onDonePressed = () => { 
        const { UpdateUsername, user } = this.props; 

        if (this.state.username !== "") { 
            UpdateUsername(this.state.username, user); 

            this.props.navigation.goBack(); 
        }
    }

    render() { 
        return (<View style={styles.main}>
                    <View style={styles.inputView}>
                        <Text sytle={styles.usernameText}>Username</Text>
                        <TextInput style={styles.input} 
                                   placeholder={"Your Username"}
                                   onChangeText={(text) => this.setState({username: text})}/>
                    </View>
                    <View style={{
                        marginTop: 25, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}>
                        <Text style={styles.instructionText}>
                            Please choose a new username, this will be used to identify you across the platform.
                        </Text>
                        <TouchableOpacity style={[styles.doneButton, {marginTop: 25}]} onPress={this.onDonePressed}> 
                            <Text style={{color: 'white'}}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center', 
        alignItems: 'center'
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

UpdateForm.propTypes = propTypes; 

export default UpdateForm; 