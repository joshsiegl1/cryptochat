import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { navigateTo } from '../actions/RouterActions'; 

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return state; 
}

export default connect(mapStateToProps, { 
    navigateTo
})(CoinListContainer)