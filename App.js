import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 
import { StackNavigator, addNavigationHelpers, TabNavigator } from 'react-navigation'; 
import { Icon } from 'react-native-elements'; 
 
import CoinListContainer from './src/containers/CoinListContainer'; 
import ChatContainer from './src/containers/ChatContainer'; 
import UserContainer from './src/containers/UserContainer'; 
import RegisterContainer from './src/containers/RegisterContainer'; 

console.disableYellowBox = true; 

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
// GLOBAL.originalXMLHttpRequest :
// GLOBAL.XMLHttpRequest;

global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

const ModalStack = StackNavigator({
  Home: { 
    screen: CoinListContainer, 
    navigationOptions: ({navigation}) => ({
      title: 'crypto-chat'
    })
  }, 
  Chat: { 
    path: 'chat/:crypto', 
    screen: ChatContainer
  }
})

const UserStack = StackNavigator({
  User: { 
    screen: UserContainer, 
    navigationOptions: ({navigation}) => ({
      title: 'User'
    })
  }, 
  Register: { 
    path: 'register', 
    screen: RegisterContainer
  }
})

const TabNav = TabNavigator({
  Home: { 
    screen: ModalStack, 
    navigationOptions: { 
      tabBarLabel: 'Home', 
      tabBarOptions: {activeTintColor: 'blue'}, 
      tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor} />
    }
  }, 
  User: { 
    screen: UserStack, 
    navigationOptions: { 
      tabBarLabel: 'User', 
      tabBarOptions: {activeTintColor: 'blue'}, 
      tabBarIcon: ({tintColor}) => <Icon name="person" size={35} color={tintColor}/>
    }
  }
})


export default class App extends React.Component {
  constructor(props) { 
    super(props); 

  }

  render() {
    return (
      <Provider store={configureStore()}>
        <TabNav />
      </Provider>
    );
  }
}
