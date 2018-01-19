import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 

import RootContainer from './src/containers/RootContainer'; 

export default class App extends React.Component {
  constructor(props) { 
    super(props); 
  }
  
  render() {
    return (
      <Provider store={configureStore()}>
        <RootContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
