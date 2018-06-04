import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {StyleSheet, View, TouchableOpacity, TextInput, Text} from 'react-native'; 

const propTypes = { 

}

class PhoneCode extends Component { 
    constructor(props) { 
        super(props); 
    }

    render() { 
        return (<View style={styles.main}> 
                <View style={styles.textContainer}>
                <Text style={styles.headerText}>Enter Your Code</Text>

                <View style={{paddingTop: 50}}>
                <TouchableOpacity style={styles.doneButton}>
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