import PropTypes from 'prop-types'; 
import React, {Component } from 'react'; 

import {View, FlatList} from 'react-native'; 

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

    _renderItem = ({item}) => (
        <CoinButton 
        id={item.id}
        naviateTo={this.props.navigateTo} />
    )

    _keyExtractor = (item, index) => item.id; 

    render() { 
        
        const { currencies, navigateTo} = this.props; 

        return (<FlatList
                 data={currencies} 
                 extraData={navigateTo} 
                 keyExtractor={this._keyExtractor} 
                 renderItem={this._renderItem}
                 />)
    }
}

export default CoinList; 