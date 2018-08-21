import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'; 

const propTypes = { 

}

class BlockedUsersForm extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            username: ""
        }
    }

    onAddPressed = () => { 

        if (this.state.username !== "") { 

        }

    }

    render() { 
        return (<View style={styles.main}>
                <View style={styles.inputView}>
                    <Text style={styles.usernameText}>User</Text>
                    <TextInput style={styles.input} 
                                   placeholder={"User to block"}
                                   onChangeText={(text) => this.setState({username: text})}/>
                </View>
                <View style={{
                        marginTop: 25, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}>
                        <Text style={styles.instructionText}>
                            You can add users to block under this section, blocked users won't be able to interact with you across the platform.
                        </Text>
                        <Text style={styles.instructionText}>
                        If a user is anonymous, you can block that user by going to their comments and clicking the three dot link.
                        </Text>
                        <TouchableOpacity style={[styles.doneButton, {marginTop: 25}]} onPress={this.onAddPressed}> 
                            <Text style={{color: 'white'}}>Add User</Text>
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

BlockedUsersForm.propTypes = propTypes; 

export default BlockedUsersForm; 