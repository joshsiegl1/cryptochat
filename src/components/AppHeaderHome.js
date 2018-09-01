import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'; 
import {Icon} from 'react-native-elements'; 

const propTypes = { }

class AppHeaderHome extends Component { 
    constructor(props) { 
        super(props)
    }

    onNewTopic = () => { 
        const { nav } = this.props; 

        nav.navigate("NewTopic"); 
    }

    render() { 
        return (<View style={styles.main}>
            <View style={styles.invisible} />
            <Image source={require('../../assets/header_logo.png')} />
            <TouchableOpacity style={styles.icon} onPress={this.onNewTopic}>
                <Icon name="add-circle-outline" size={25} color='blue'/>
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
        width: 25, 
        height: 25, 
        padding: 0, 
        margin: 0, 
        lineHeight: 25, 
    }, 
    invisible: { 
        width: 25, 
        height: 25,
    }
})

AppHeaderHome.propTypes = propTypes; 

export default AppHeaderHome; 