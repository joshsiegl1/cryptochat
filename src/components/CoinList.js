import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View} from 'react-native'; 

import CoinButton from './CoinButton'; 

const propTypes = { 
    currencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    }))
}

class CoinList extends Component { 
    constructor(props) { 
        super(props)

        this.state = { 
            buttons: []
        }
    }

    componentWillMount() { 
        // if (this.state.currencies === undefined ||
        //     this.state.currencies.length <= 0) {

        //     const { currencies } = this.props; 
        //     let buttons = currencies.map((c) => <CoinButton {...c} />); 
        //     this.setState({ currencies })
        // }
    }

    render() { 

        const { currencies } = this.props; 
        let buttons = (<View />)
        if (currencies !== undefined && currencies !== null) {
            if (currencies.length > 0) {  
                buttons = currencies.map((c) => <CoinButton {...c} />); 
            }
        }

        return(<View>
            {buttons}
        </View>)
    }
}

export default CoinList; 