import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Slide from './Slide.js'; 

const { width, height } = Dimensions.get('window');

const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)
);

export default class AppIntro extends React.Component {
  static defaultProps = {
    activeDotColor: 'rgba(0, 0, 0, .9)',
    dotColor: 'rgba(0, 0, 0, .2)',
    skipLabel: 'Skip',
    doneLabel: 'Done',
    nextLabel: 'Next',
    prevLabel: 'Back',
  }
  state = {
    width,
    height,
    activeIndex: 0,
  };

  _onChatPressed = () => { 
      const { onChatPressed } = this.props;

      onChatPressed(); 
  }

  _renderItem = (item) => {
    const { width, height } = this.state;
    const bottomSpacer = (this.props.bottomButton ? (this.props.showSkipButton ? 44 : 0) + 44 : 0) + (isIphoneX ? 34: 0) + 64;
    const topSpacer = (isIphoneX ? 44 : 0) + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight);
    const props = { ...item.item, bottomSpacer, topSpacer, width, height };

    return <Slide {...props}>{item.item}</Slide>
  }

  _renderPagination = () => {

    return (
      <View style={[styles.paginationContainer, {bottom: (this.state.height / 3) - 68 + (isIphoneX ? 34 : 0)}]}>
        <View style={styles.paginationDots}>
          {this.props.slides.length > 1 && this.props.slides.map((_, i) => (
            <View
              key={i}
              style={[
                { backgroundColor: i === this.state.activeIndex ? this.props.activeDotColor : this.props.dotColor },
                styles.dot,
              ]}
            />
          ))}
        </View>
        
        <View style={[styles.chatButtonContainer, {bottom: (this.state.height / 3) - 350}]}>
          <TouchableOpacity style={styles.chatButton} onPress={this._onChatPressed}>
            <Text style={{color: 'white', fontSize: 18}}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  _onMomentumScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = Math.round(offset / this.state.width);
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    const lastIndex = this.state.activeIndex;
    this.setState({ activeIndex: newIndex });
    this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
  }

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({ width, height });
      // Set new scroll position
      const func = () => { this.flatList.scrollToOffset({ offset: this.state.activeIndex * width, animated: false }) }
      Platform.OS === 'android' ? setTimeout(func, 0) : func();
    }
  }

  render() {
    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={this.props.slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flexOne}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={this.state.width}
          onLayout={this._onLayout}
        />
        {this._renderPagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    //bottom: 16 + (isIphoneX ? 34 : 0),
    left: 0,
    right: 0,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  chatButtonContainer: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatButton: { 
    width: 200, 
    height: 50, 
    backgroundColor: '#373F51', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#373F51'
  },  
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  bottomButtonContainer: {
    height: 44,
    marginHorizontal: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});