import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList} from 'react-native'; 

import CoinButton from './CoinButton'; 

const propTypes = { 
    navigate: PropTypes.func, 
    currencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    }))
}

class CoinList extends Component { 
    constructor(props) { 
        super(props)
    }

    componentWillMount() { 
        const {currencies, fetchTopFiftyCryptoCurrencies} = this.props; 

        if (currencies === null) { 
            fetchTopFiftyCryptoCurrencies(); 
        }
    }

    _renderItem = ({item}) => (
        <CoinButton 
        id={item.id}
        navigate={this.props.navigation.navigate} />

    )

    _keyExtractor = (item, index) => item.Id; 

    render() { 

        const { currencies} = this.props; 

        const nav = this.props.navigation.navigate; 

        return (<FlatList
                 data={currencies} 
                 extraData={nav} 
                 keyExtractor={this._keyExtractor} 
                 renderItem={this._renderItem}
                 />)
    }
}

export default CoinList; 