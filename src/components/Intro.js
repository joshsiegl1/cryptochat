import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 

import { View, Text, Alert } from 'react-native'; 

// import AppIntroSlider from 'react-native-app-intro-slider';

import AppIntro from './AppIntro/AppIntro.js'; 
import SlideOne from './AppIntro/SlideOne.js'; 
import SlideTwo from './AppIntro/SlideTwo.js'; 
import SlideThree from './AppIntro/SlideThree.js'; 

const propTypes = { }

class Intro extends Component { 
    _onChatPressed = () => { 
        const { navigate } = this.props.navigation; 

        navigate("PhoneNumber")
    }

    render() { 

        const slides = [
            (<SlideOne />), 
            (<SlideTwo />), 
            (<SlideThree />)]; 

        return <AppIntro
        slides={slides} 
        onChatPressed={this._onChatPressed}/>
    }
}

Intro.propTypes = propTypes; 

export default Intro; 