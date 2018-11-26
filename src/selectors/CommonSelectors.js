import { createSelector } from 'reselect'; 

export const getCurrencies = state => state.cryptocurrency.currencies;
export const getOthers = state => state.cryptocurrency.others; 

export const getCoinList = createSelector(
    getCurrencies, 
    getOthers, 
    (currencies, others) => { 
        if (others !== null) { 
            var sorted = others.sort(function(a, b){ return a.cmcRank - b.cmcRank});
            return sorted; 
        }
            
        return null; 
    }
)

export const getUser = state => state.user.user; 
export const getUserGroups = state => state.user.userGroups; 
export const getChats = state => state.chats.chats;
export const getMessages = state => state.message.messages; 
export const getNewUserGroup = state => state.message.newUserGroup; 
export const getPhone = state => state.user.phone;  
export const getComment = state => state.chats.comment; 
export const getReplies = state => state.chats.replies; 
export const getCurrentTime = state => state.chats.time; 
export const getCurrentMessageTime = state => state.message.time;
export const getLikedPosts = state => state.user.likedPosts; 
export const getDislikedPosts = state => state.user.dislikedPosts; 
export const getValidated = state => state.user.validated