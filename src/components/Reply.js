import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import Transform from './Transform'; 

import { View, Text, StyleSheet } from 'react-native'; 

const propTypes = { 
    data: PropTypes.shape, 
    navigate: PropTypes.func, 
    fullData: PropTypes.shape
}

class Reply extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 

        const { data } = this.props; 

        let username = "anonymous";

        try { 
        let userID = data.userID[0]; 
        username = userID.username; 
        }
        catch (e) { 

        }

        return (<View style={styles.main}>
                <Text>{username}</Text>
                <Transform body={data.body} 
                           navigate={this.props.navigate}
                           fullData={this.props.fullData}/> 
                </View>)
    }
}

const styles = StyleSheet.create({
    main: { 
        marginLeft: 20, 
        padding: 5, 
        backgroundColor: 'lightyellow'
    }
})

Reply.propTypes = propTypes; 

export default Reply; 