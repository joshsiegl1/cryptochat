import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { navigateTo } from '../actions/RouterActions'; 

import { getCurrencies } from '../selectors/CommonSelectors'; 

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        currencies: getCurrencies(state)
    }
}

export default connect(mapStateToProps, { 
    navigateTo
})(CoinListContainer)