import { createSelector } from 'reselect'; 

export const getCurrencies = state => state.cryptocurrency.currencies; 
export const getChats = state => state.chats.chats; 