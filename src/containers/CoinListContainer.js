import React from 'react'; 
import { connect } from 'react-redux'; 

import CoinList from '../components/CoinList'; 

import { getCurrencies, getPhone, 
         getLikedPosts, getDislikedPosts, getCoinList } from '../selectors/CommonSelectors'; 

import { DispatchUserfromStorage, DispatchLikedPostsfromStorage } from '../actions/UserActions'; 
import { fetchTopFiftyCryptoCurrencies, fetchOthers } from '../actions/CoinMarketCapActions';

const CoinListContainer = props => <CoinList {...props} />

const mapStateToProps = (state) => { 
    return { 
        currencies: getCoinList(state), 
        LikedPosts: getLikedPosts(state), 
        DislikedPosts: getDislikedPosts(state)
    }
}

export default connect(mapStateToProps, { 
    fetchTopFiftyCryptoCurrencies, 
    fetchOthers,
    DispatchUserfromStorage, 
    DispatchLikedPostsfromStorage
})(CoinListContainer)