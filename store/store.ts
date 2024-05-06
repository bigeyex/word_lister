import { combineReducers, configureStore,  } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userProfileReducer from './userProfile';
import bookListReducer from './bookList';
import planReducer from './plan';
import wordListReducer from './wordList';

const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userProfile']
}

const userProfileConfig = {
    key: 'userProfile',
    storage: AsyncStorage,
}

const reducers = {
    userProfile: persistReducer(userProfileConfig, userProfileReducer), 
    bookList: bookListReducer,
    plan: planReducer,
    wordList: wordListReducer,
}

const storeForTyping = configureStore({
    reducer: reducers
})

export const store = configureStore({
    reducer: persistReducer(rootConfig, combineReducers(reducers)),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof storeForTyping.getState>
export type AppDispatch = typeof store.dispatch