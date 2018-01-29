import React from 'react'; 
import { connect } from 'react-redux'; 

import Root from '../components/Root'; 

import { fetchTopFiftyCryptoCurrencies } from '../actions/CoinMarketCapActions'; 
import { getCurrencies } from '../selectors/CommonSelectors'; 

import { 
    INDEX_PATH, 
    CHAT_PATH
} from '../constants/RouterConstants'; 

import CoinListContainer from './CoinListContainer'; 
import ChatContainer from './ChatContainer'; 

const RootContainer = (props) => <Root {...props} />

const mapStateToProps = (state) => { 
    const { router } = state; 

    return { 
        currencies: getCurrencies(state), 
        router, 
        routes: { 
            [INDEX_PATH]: CoinListContainer, 
            [CHAT_PATH]: ChatContainer
        }
    }
}

export default connect(mapStateToProps, {
    fetchTopFiftyCryptoCurrencies
})(RootContainer); 