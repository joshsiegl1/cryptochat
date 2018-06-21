import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { getCurrencies, getPhone, 
         getLikedPosts, getDislikedPosts, getCoinList, getValidated, getUser } from '../selectors/CommonSelectors'; 

import { DispatchUserfromStorage, DispatchLikedPostsfromStorage, ValidateToken, GetUser } from '../actions/UserActions'; 
import { fetchTopFiftyCryptoCurrencies, fetchOthers } from '../actions/CoinMarketCapActions';

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        user: getUser(state), 
        validated: getValidated(state), 
        currencies: getCoinList(state), 
        LikedPosts: getLikedPosts(state), 
        DislikedPosts: getDislikedPosts(state)
    }
}

export default connect(mapStateToProps, { 
    GetUser, 
    ValidateToken, 
    fetchTopFiftyCryptoCurrencies, 
    fetchOthers,
    DispatchUserfromStorage, 
    DispatchLikedPostsfromStorage
})(CoinListContainer)