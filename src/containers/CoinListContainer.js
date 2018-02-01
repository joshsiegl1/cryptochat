import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { getCurrencies } from '../selectors/CommonSelectors'; 

import { fetchTopFiftyCryptoCurrencies } from '../actions/CoinMarketCapActions'; 

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        currencies: getCurrencies(state)
    }
}

export default connect(mapStateToProps, { 
    fetchTopFiftyCryptoCurrencies
})(CoinListContainer)