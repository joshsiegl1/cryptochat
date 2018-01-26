import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 
import {View, Text, Image} from 'react-native'; 

import CoinList from './CoinList'; 

import style from '../styles/stylesheet'; 

const propTypes = { 
    fetchTopFiftyCryptoCurrencies: PropTypes.func.isRequired
}

class Root extends Component { 
    componentWillMount() { 
        const {currencies, fetchTopFiftyCryptoCurrencies} = this.props; 

        if (currencies === null) { 
            fetchTopFiftyCryptoCurrencies(); 
        }
    }

    render() { 
        return (<View style={{
                padding: 10
            }}>
                <View> 
                    <CoinList currencies={this.props.currencies} /> 

                </View>
            </View>)
    }
}

Root.propTypes = propTypes; 

export default Root; 