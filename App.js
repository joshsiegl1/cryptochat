import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) { 
    super(props); 

    this.state = { 
      text: 'this is useless text'
    }; 
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I changed this</Text>
        <TextInput
        style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text} />
      </View>
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
