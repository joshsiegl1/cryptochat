import React from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 
import { createStackNavigator,
        addNavigationHelpers, 
        createTabNavigator, 
        createDrawerNavigator, 
        createSwitchNavigator } from 'react-navigation'; 
import { Icon } from 'react-native-elements'; 
import { AppLoading, Asset, Font, Permissions, Notifications } from 'expo'; 
import { SafeAreaView } from 'react-navigation';  

import PhoneNumberContainer from './src/containers/PhoneNumberContainer'; 
import PhoneCodeContainer from './src/containers/PhoneCodeContainer';
import CoinListContainer from './src/containers/CoinListContainer'; 
import ChatContainer from './src/containers/ChatContainer'; 
import AccountContainer from './src/containers/AccountContainer'; 
import UserContainer from './src/containers/UserContainer'; 
import CommentContainer from './src/containers/CommentContainer'; 
import ChatWindowContainer from './src/containers/ChatWindowContainer'; 
import WebContainer from './src/containers/WebContainer';
import IntroContainer from './src/containers/IntroContainer';  
import AppHeader from './src/components/AppHeader'; 

import AuthLoadingScreen from './src/components/AuthLoadingScreen'; 

console.disableYellowBox = true; 

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
// GLOBAL.originalXMLHttpRequest :
// GLOBAL.XMLHttpRequest;

// global._fetch = fetch;
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch', { request: { uri, options, ...args }, response });
//     return response;
//   });
// };

StatusBar.setBarStyle('default', true); 

const PhoneCodeStack = createStackNavigator({
  Home: { 
    screen: PhoneNumberContainer, 
    navigationOptions: {
      title: 'Welcome to Cryptochat' 
      //header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
    }
  }, 
  PhoneCode: {
    path: 'phonecode',  
    screen: PhoneCodeContainer, 
    navigationOptions: { 
      title: 'Welcome to Cryptochat'
      //header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
    }
  }
})

const AuthStack = createStackNavigator({
  Home: IntroContainer, 
  // navigationOptions: { 
  //   header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
  // }, 
  PhoneNumber: { 
    path: 'phonenumber', 
    screen: PhoneNumberContainer, 
    // navigationOptions: { 
    //   header: props => <SafeAreaView style={{backgroundColor: 'white'}} /> 
    // }
  }, 
  PhoneCode: { 
    path: 'phonecode', 
    screen: PhoneCodeContainer
  }
})

const ModalStack = createStackNavigator({
  // Home: { 
  //   screen: IntroContainer, 
  //   navigationOptions: { 
  //     header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
  //   }
  // }, 
  // PhoneNumber: { 
  //   path: 'phonenumber',
  //   screen: PhoneCodeStack, 
  //   navigationOptions: { 
  //     header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
  //   }
  // }, 
  //CoinList: { 
  Home: {
    //path: 'coinlist', 
    screen: CoinListContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={false}/>
    })
  }, 
  Chat: { 
    path: 'chat/:crypto', 
    screen: ChatContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={true}/>,
    })
  }, 
  Comment: { 
    path: 'comment/:postID/:crypto/:karma', 
    screen: CommentContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={true} />, 
    })
  }, 
  ChatWindow: { 
    path: 'chatwindow/:postID/:crypto', 
    screen: ChatWindowContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={true} />
    })
  }, 
  Web: { 
    path: 'web/:url', 
    screen: WebContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={true} />
    })
  }
})

const UserStack = createStackNavigator({
  User: { 
    screen: UserContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={false}/>,
    })
  }
})

const StartStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen, 
  App: ModalStack, 
  Auth: AuthStack
}, 
{ 
  initialRouteName: 'AuthLoading'
})

const DrawerNav = createDrawerNavigator({
  Home: { 
    screen: StartStack
  }, 
  Account: { 
    screen: UserStack
  }
}); 

// const TabNav = TabNavigator({
//   Home: { 
//     screen: ModalStack, 
//     navigationOptions: { 
//       tabBarLabel: 'Home', 
//       tabBarOptions: {activeTintColor: 'blue'}, 
//       tabBarPosition: 'bottom', 
//       tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor} />
//     }
//   }, 
//   User: { 
//     screen: UserStack, 
//     navigationOptions: { 
//       tabBarLabel: 'User', 
//       tabBarOptions: {activeTintColor: 'blue'}, 
//       tabBarPosition: 'bottom', 
//       tabBarIcon: ({tintColor}) => <Icon name="person" size={35} color={tintColor}/>
//     }
//   }
// }, { 
//   tabBarPosition: 'bottom'
// })


export default class App extends React.Component {
  constructor(props) { 
    super(props); 

    this.state = { 
      isLoadingComplete: false,
    }

  }

  _loadResourcesAsync = async () => { 
    return Promise.all([
      Asset.loadAsync([
        require('./assets/up_arrow.png'), 
        require('./assets/down_arrow.png'), 
        require('./assets/reply.png'), 
        require('./assets/back.png'), 
        require('./assets/ic_send.png'), 
        require('./assets/up_arrow_pressed.png'), 
        require('./assets/down_arrow_pressed.png'), 
        require('./assets/time.png'), 
        require('./assets/menu_btn.png'), 
        require('./assets/comment.png'),
        require('./assets/ic_link.png'), 
        require('./assets/ic_close.png'), 
        require("./assets/ic_pic.png"), 
        require("./assets/slide_one_img.png"), 
        require("./assets/slide_two_img.png"), 
        require("./assets/slide_three_img.png")
      ]), 
      Font.loadAsync({
        'arial' : require('./assets/arial.ttf')
      })
    ]); 
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => { 
    this.setState({isLoadingComplete: true}); 
  }

  render() {

    if (!this.state.isLoadingComplete) { 
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    else { 
      return (
        <Provider store={configureStore()}>
          <DrawerNav />
        </Provider>
      );
    }
  }
}
