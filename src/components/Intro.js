import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 

import { View, Text, Alert } from 'react-native'; 

// import AppIntroSlider from 'react-native-app-intro-slider';

import AppIntro from './AppIntro/AppIntro.js'; 
import SlideOne from './AppIntro/SlideOne.js'; 

const propTypes = { }

class Intro extends Component { 
    _onDone = () => { 
        const { navigate } = this.props.navigation; 

        navigate("CoinList")
    }

    render() { 

        const slides = [
            (<SlideOne />), 
            (<View><Text>My Second Component</Text></View>)]; 

        return <AppIntro
        slides={slides} 
        onDone={this._onDone}/>
    }
}

Intro.propTypes = propTypes; 

export default Intro; 