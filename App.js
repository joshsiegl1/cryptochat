import React from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 
import { StackNavigator, addNavigationHelpers, TabNavigator, DrawerNavigator } from 'react-navigation'; 
import { Icon } from 'react-native-elements'; 
import { AppLoading, Asset, Font, Permissions, Notifications } from 'expo'; 
import { SafeAreaView } from 'react-navigation';  

import CoinListContainer from './src/containers/CoinListContainer'; 
import ChatContainer from './src/containers/ChatContainer'; 
import AccountContainer from './src/containers/AccountContainer'; 
import UserContainer from './src/containers/UserContainer'; 
import RegisterContainer from './src/containers/RegisterContainer'; 
import CommentContainer from './src/containers/CommentContainer'; 
import ChatWindowContainer from './src/containers/ChatWindowContainer'; 
import WebContainer from './src/containers/WebContainer';
import IntroContainer from './src/containers/IntroContainer';  
import AppHeader from './src/components/AppHeader'; 

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

const ModalStack = StackNavigator({
  Home: { 
    screen: IntroContainer, 
    navigationOptions: { 
      header: props => <SafeAreaView style={{backgroundColor: 'white'}} />
    }
  }, 
  CoinList: { 
    path: 'coinlist', 
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

const UserStack = StackNavigator({
  User: { 
    screen: UserContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={false}/>,
    })
  }, 
  Register: { 
    path: 'register', 
    screen: RegisterContainer, 
    navigationOptions: ({navigation}) => ({
      header: props => <AppHeader nav={navigation} renderBackButton={true}/>,
    })
  }
})

const DrawerNav = DrawerNavigator({
  Home: { 
    screen: ModalStack
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
        require("./assets/slide_one_img.png")
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
