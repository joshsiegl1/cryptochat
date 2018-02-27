import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 
import { StackNavigator, addNavigationHelpers, TabNavigator } from 'react-navigation'; 
import { Icon } from 'react-native-elements'; 
 
import CoinListContainer from './src/containers/CoinListContainer'; 
import ChatContainer from './src/containers/ChatContainer'; 
import UserContainer from './src/containers/UserContainer'; 

console.disableYellowBox = true; 

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
