import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View} from 'react-native'; 

import CoinButton from './CoinButton'; 

const propTypes = { 
    navigateTo: PropTypes.func, 
    currencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    }))
}

class CoinList extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 

        const { currencies, navigateTo } = this.props; 
        let buttons = (<View />)
        if (currencies !== undefined && currencies !== null) {
            if (currencies.length > 0) {  
                buttons = currencies.map((c) => {
                    let props = {
                        ...c, 
                        navigateTo
                    }
                    return (<CoinButton {...props} /> )
                }); 
            }
        }

        return(<View>
            {buttons}
        </View>)
    }
}

export default CoinList; 