import { AsyncStorage } from 'react-native'; 

export const SetItem = async (key, item) => { 
    try { 
        await AsyncStorage.setItem(key, item); 
    }
    catch (e) { 
        //console.log(e) 
    }
}

export const GetItem = async (key) => { 
    try { 
        await AsyncStorage.getItem(key); 
    }
    catch (e) { 
        //console.log(e) 
    }
}

export const SetUser = async (userID, email, karma, fbid) => { 
    try { 
        await AsyncStorage.multiSet([
        ['userID', userID], 
        ['email', email], 
        ['karma', karma.toString()], 
        ['fbid', fbid]]); 
    }
    catch (e) { 
        //console.log(e); 
    }
}

//arrays of postID's
export const SetLikedPosts = async (likedPosts, dislikedPosts) => { 
    try { 
        await AsyncStorage.multiGet([
            'likedPosts', 
            'dislikedPosts'
        ], async (err, values) => { 
            if (values.length > 0) { 
                let like = likedPosts; 
                let disliked = dislikedPosts; 
                if (values[0][1] !== null) { 
                    let posts = JSON.parse(values[0][1]); 
                    like = [...posts, ...likedPosts]; 
                }
                if (values[1][1] !== null) { 
                    let posts = JSON.parse(values[1][1]); 
                    disliked = [...posts, ...dislikedPosts]; 
                }

                if (like.length <= 0) { 
                    like = ["postID"]
                }

                if (disliked.length <= 0) { 
                    disliked = ["postID"]
                }

                await AsyncStorage.multiSet([
                    ['likedPosts', JSON.stringify(like)], 
                    ['dislikedPosts', JSON.stringify(disliked)]
                ]); 
            }
        })
    }
    catch (e) { 

    }
}

export const GetLikedPosts = async (fn) => { 
    try { 
        await AsyncStorage.multiGet([
            'likedPosts', 
            'dislikedPosts'
        ], (err, values) => { 
            if (values.length > 0) {
                let liked = []; 
                let disliked = [];  
                if (values[0][1] !== null) { 
                    liked = JSON.parse(values[0][1]); 
                }
                if (values[1][1] !== null) { 
                    disliked = JSON.parse(values[1][1]); 
                }

                fn(liked, disliked); 
            }
            else fn([], []); 
        })
    }
    catch (e) { 

    }
}

export const GetUser = async (fn) => { 
    try { 
        await AsyncStorage.multiGet([
            'userID', 
            'email', 
            'karma', 
            'fbid'
        ], (err, values) => { 
            if (values.length > 0)
            {
                if (values[0][1] === null)
                    fn(undefined); 
                else fn(values); 
            }
            else fn(undefined); 
        })
    }
    catch (e) { 
        //console.log(e); 
    }
}

export const DeleteUser = async () => { 
    try { 
        let keys = ['userID', 'email', 'karma', 'fbid']
        await AsyncStorage.multiRemove(keys, (err) => { 
            //console.log(err); 
        })
    }
    catch (e) { 
        //console.log(e) 
    }
}

