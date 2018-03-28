import { createSelector } from 'reselect'; 

export const getCurrencies = state => state.cryptocurrency.currencies; 
export const getChats = state => state.chats.chats;
export const getUser = state => state.user.user;  
export const getComment = state => state.chats.comment; 