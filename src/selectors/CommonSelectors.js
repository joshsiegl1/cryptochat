import { createSelector } from 'reselect'; 

export const getCurrencies = state => state.cryptocurrency.currencies;
export const getOthers = state => state.cryptocurrency.others; 

export const getCoinList = createSelector(
    getCurrencies, 
    getOthers, 
    (currencies, others) => { 
        if (currencies && others !== null)
            return [...others, ...currencies];
            
        return null; 
    }
)

export const getChats = state => state.chats.chats;
export const getUser = state => state.user.user;  
export const getComment = state => state.chats.comment; 
export const getReplies = state => state.chats.replies; 
export const getCurrentTime = state => state.chats.time; 
export const getLikedPosts = state => state.user.likedPosts; 
export const getDislikedPosts = state => state.user.dislikedPosts; 