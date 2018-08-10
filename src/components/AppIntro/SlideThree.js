import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, Text, Image, StyleSheet} from 'react-native'; 

export default class SlideThree extends Component { 
    render() { 
        return (<View style={styles.main}>
            <Image style={styles.img} source={require("../../../assets/slide_three_img.png")} /> 
            <Text style={styles.title}>Secure</Text>
            <Text style={styles.subTitle}>Cryptochat keeps all of your private data encrypted and your identity secure.</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        justifyContent: 'center',
        alignItems: 'center' 
    }, 
    title: { 
        fontSize: 26, 
        fontWeight: '300', 
        paddingTop: 50, 
        paddingBottom: 20
    }, 
    subTitle: { 
        fontSize: 16, 
        fontWeight: '300'
    }, 
    img: { 
        width: 200, 
        height: 200
    }
})