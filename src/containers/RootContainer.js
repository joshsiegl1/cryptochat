import React from 'react'; 
import { connect } from 'react-redux'; 

import Root from '../components/Root'; 

import { fetchTopFiftyCryptoCurrencies } from '../actions/CoinMarketCapActions'; 

import { 
    INDEX_PATH
} from '../constants/RouterConstants'; 

import CoinListContainer from './CoinListContainer'; 

const RootContainer = (props) => <Root {...props} />

const mapStateToProps = (state) => { 
    const { router } = state; 

    return { 
        router, 
        routes: { 
            [INDEX_PATH]: CoinListContainer
        }
    }
}

export default connect(mapStateToProps, {
    fetchTopFiftyCryptoCurrencies
})(RootContainer); 