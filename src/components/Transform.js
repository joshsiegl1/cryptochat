import PropTypes from 'prop-types'; 
import React, {Component} from 'react'; 

import { View, Text, Image} from 'react-native'; 

import Link from './Link'; 
import SmartImage from './SmartImage'; 
import Reply from './Reply'; 

import { parseLinks, 
         parseImage, 
         parseRealLinks, 
         parseReplies } from '../utils/ChatUtils'; 

const propTypes = { 
    body: PropTypes.string.isRequired, 
    navigate: PropTypes.func, 
    fullData: PropTypes.shape
}

class Transform extends Component { 
    constructor(props) { 
        super(props)
    }

    render() { 
        let { body, fullData } = this.props;

        let data = fullData; 

        let replies = parseReplies(body); 
        let realLinks = parseRealLinks(body); 
        let image = parseImage(body); 
        let links = parseLinks(body); 

        let uri = "https://s3.amazonaws.com/cryptochat-app-45/" + image;
        
        let b = body; 

        let replyIndexes = []; 
        let replyData = ''; 
        for (let i = 0; i < replies.length; i++) { 
            let id = replies[i].substr(1, replies[i].length); 
            for (let x = 0; x < data.length; x++) { 
                if (data[x].Id === id) { 
                    replyData = data[x]; 
                }
            }
            replyIndexes.push(b.search(replies[i])); 
            b = b.replace(replies[i], ""); 
        }

        let realLinkIndexes = []; 
        for (let i = 0; i < realLinks.length; i++) { 
            realLinkIndexes.push(b.search(realLinks[i])); 
            b = b.replace(realLinks[i], ""); 
        }
        
        let imageIndex = []; 
        if (image !== "") { 
            imageIndex.push(b.search(image)); 
            b = b.replace("{" + image + "}", ""); 
        }

        let linkIndexes = []; 
        for (let i = 0; i < links.length; i++) { 
            let p = `|name=${links[i].name};url=${links[i].url}|`; 
            linkIndexes.push(b.search(p)); 
            b = b.replace(p, ""); 
        }

        //these are the locations of the content within the block of text or "message"
        let indexes = [...replyIndexes, 
                       ...realLinkIndexes,
                       ...imageIndex,
                       ...linkIndexes]; 

        indexes = indexes.sort((a, b) => a - b); 

        let objectBody = []; 
        for (let x = 0; x < indexes.length; x++) {

            let type = ""; 
            if (realLinkIndexes.indexOf(indexes[x]) !== -1) {
                type = "RealLink"; 
            }
            else if (linkIndexes.indexOf(indexes[x]) !== -1) { 
                type = "Link"; 
            }
            else if (replyIndexes.indexOf(indexes[x]) !== -1) { 
                type = "Reply"; 
            }
            else { 
                type = "Image"; 
            }

            let start_pos = (x === 0) ? 0 : indexes[x - 1];
            let piece = b.slice(start_pos, indexes[x]); 

            objectBody.push(<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'arial'}}>{piece}</Text>)

            let component = (<Text></Text>); 
            if (type === "Image") {
                component = (<Image source={{uri: uri, cache: 'force-cache'}} style={{width: '100%', height: 300}} />)
            }
            else if (type === "Link") {  
                component = (<Link navigate={this.props.navigate}
                                   name={links[x].name}
                                   url={links[x].url} />)
            }
            else if (type === "Reply") { 
                component = (<Reply data={replyData}
                                    navigate={this.props.navigate}
                                    fullData={this.props.fullData} />); 
            }
            else { 
                component = (<Link navigate={this.props.navigate}
                                   name={realLinks[x]}
                                   url={realLinks[x]} />)
            }

            objectBody.push(component); 

            if (x === indexes.length - 1) { 
                let lastPiece = b.slice(indexes[x])
                objectBody.push(<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'open-sans-regular'}}>{lastPiece}</Text>)
            }
        }

        return (objectBody.length > 0) ? (<View style={{minWidth: '100%'}}>{objectBody}</View>) : (<Text style={{fontSize: 18, color: '#373F51', fontFamily: 'open-sans-regular'}}>{b}</Text>)
    }
}

Transform.propTypes = propTypes; 

export default Transform; 