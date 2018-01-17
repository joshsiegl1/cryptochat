import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore.js'; 

export default class App extends React.Component {
  constructor(props) { 
    super(props); 

    this.state = { 
      text: 'this is useless text'
    }; 
  }
  render() {
    return (
      <Provider store={configureStore()}>
      <View style={styles.container}>
        <Text>I changed this</Text>
        <TextInput
        style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text} />
      </View>
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
