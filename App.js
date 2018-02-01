import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 
import { StackNavigator, addNavigationHelpers } from 'react-navigation'; 
 
import CoinListContainer from './src/containers/CoinListContainer'; 
import ChatContainer from './src/containers/ChatContainer'; 

const ModalStack = StackNavigator({
  Home: { 
    screen: CoinListContainer
  }, 
  Chat: { 
    path: 'chat/:crypto', 
    screen: ChatContainer
  }
})


export default class App extends React.Component {
  constructor(props) { 
    super(props); 

  }

  render() {
    return (
      <Provider store={configureStore()}>
        <ModalStack />
      </Provider>
    );
  }
}
