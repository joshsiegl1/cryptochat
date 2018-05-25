import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

export default class Slide extends React.PureComponent {
  render() {
    const style = {
      //backgroundColor: this.props.backgroundColor,
      //paddingTop: this.props.topSpacer,
      //paddingBottom: this.props.bottomSpacer,
      width: this.props.width,
      height: this.props.height,
    }
    return (
      <View style={[styles.mainContent, style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: 'white', 
    padding: 50
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  }
});