import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { getCurrencies, getPhone, 
         getLikedPosts, getDislikedPosts, getCoinList, getValidated } from '../selectors/CommonSelectors'; 

import { DispatchUserfromStorage, DispatchLikedPostsfromStorage, ValidateToken } from '../actions/UserActions'; 
import { fetchTopFiftyCryptoCurrencies, fetchOthers } from '../actions/CoinMarketCapActions';

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        validated: getValidated(state), 
        currencies: getCoinList(state), 
        LikedPosts: getLikedPosts(state), 
        DislikedPosts: getDislikedPosts(state)
    }
}

export default connect(mapStateToProps, { 
    ValidateToken, 
    fetchTopFiftyCryptoCurrencies, 
    fetchOthers,
    DispatchUserfromStorage, 
    DispatchLikedPostsfromStorage
})(CoinListContainer)