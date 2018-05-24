import PropTypes from 'prop-types'; 
import React, { Component } from 'react'; 

import { Alert } from 'react-native'; 

import AppIntroSlider from 'react-native-app-intro-slider';

const propTypes = { }

class Intro extends Component { 
    _onDone = () => { 
        const { navigate } = this.props.navigation; 

        navigate("CoinList")
    }
    render() { 

        const slides = [{
            key: 'first', 
            title: 'Page 1', 
            text: 'Page 1 description', 
            backgroundColor: '#59b2ab'
        }, 
        {
            key: 'second', 
            title: 'Page 2', 
            text: 'Page 2', 
            backgroundColor: 'yellow'
        }]

        return <AppIntroSlider 
        slides={slides} 
        onDone={this._onDone}/>
    }
}

Intro.propTypes = propTypes; 

export default Intro; 