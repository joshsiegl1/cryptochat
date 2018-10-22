import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'; 
import { Icon } from 'react-native-elements'; 

const propTypes = { }

class AppHeaderMessage extends Component { 
    constructor(props) { 
        super(props)
    }

    onNewMessage = () => { 
        const { nav } = this.props; 

        nav.navigate("NewMessage"); 
    }

    render() { 
        return (<View style={styles.main}>
            <View style={styles.invisible} />
            <Image source={require('../../assets/header_logo.png')} />
            <TouchableOpacity style={styles.icon} onPress={this.onNewMessage}>
                <Icon name="add-circle-outline" size={35} color='#373F51'/>
            </TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingRight: 15, 
        paddingLeft: 15
    }, 
    icon: { 
        width: 35, 
        height: 35, 
        padding: 0, 
        margin: 0, 
        lineHeight: 25, 
    }, 
    invisible: { 
        width: 25, 
        height: 25,
    }
})

AppHeaderMessage.propTypes = propTypes; 

export default AppHeaderMessage; 