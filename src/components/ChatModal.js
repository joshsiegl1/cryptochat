import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Modal, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'; 

const propTypes = { 
    visible: PropTypes.boolean, 
    item: PropTypes.shape({}), 
    onModalClose: PropTypes.func, 
    onBlockUser: PropTypes.func, 
    onFlagPost: PropTypes.func, 
    onBlockPost: PropTypes.func
}

class ChatModal extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        return (<Modal visible={this.props.visible}
                       transparent={true}
                       onRequestClose={this.props.onModalClose}
                       animationType="fade">
            <View style={styles.modalOuter}>
                <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.props.onBlockUser(this.props.item.userID[0].Id)}>
                    <Image style={styles.modalImage} source={require("../../assets/block.png")}/>
                    <Text style={styles.modalFont}>Block User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.props.onFlagPost(this.props.item.postID)}>
                    <Image style={styles.modalImage} source={require("../../assets/flag.png")}/>
                    <Text style={styles.modalFont}>Report Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.props.onBlockPost(this.props.item.postID)}>
                    <Image style={styles.modalImage} source={require("../../assets/stop.png")}/>
                    <Text style={styles.modalFont}>Hide Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeModalButton} onPress={this.props.onModalClose}>
                            <Text style={{color: 'white'}}>Close</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }
}

const styles = StyleSheet.create({
    modalOuter: { 
        flex: 1,
        justifyContent: 'flex-end', 
        flexDirection: "column",
        margin: 0,
        backgroundColor: '#00000080'
    }, 
    modalContent: { 
        width: '100%', 
        backgroundColor: 'white',
        padding: 10,
        paddingBottom: 5,
        marginBottom: 50, 
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }, 
    closeModalButton: { 
        width: '100%', 
        height: 40, 
        backgroundColor: '#373F51', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#373F51', 
        marginTop: 5, 
        marginBottom: 5,   
    }, 
    modalImage: { 
        width: 15, 
        height: 15, 
        marginRight: 15
    }, 
    modalFont: { 
        color: '#373F51', 
        lineHeight: 15
    }, 
    modalButton: { 
        flexDirection: 'row', 
        padding: 15, 
        alignItems: 'flex-start'
    }
})

ChatModal.propTypes = propTypes; 

export default ChatModal; 