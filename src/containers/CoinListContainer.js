import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { getCurrencies, getUser } from '../selectors/CommonSelectors'; 

import { DispatchUserfromStorage } from '../actions/UserActions'; 
import { fetchTopFiftyCryptoCurrencies } from '../actions/CoinMarketCapActions'; 

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        currencies: getCurrencies(state), 
        User: getUser(state)
    }
}

export default connect(mapStateToProps, { 
    fetchTopFiftyCryptoCurrencies, 
    DispatchUserfromStorage
})(CoinListContainer)