import { combineReducers, configureStore,  } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userProfileReducer from './userProfile';
import bookListReducer from './bookList';

const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userProfile']
}

const userProfileConfig = {
    key: 'userProfile',
    storage: AsyncStorage,
}

export const store = configureStore({
    reducer: persistReducer(rootConfig, combineReducers({
        userProfile: persistReducer(userProfileConfig, userProfileReducer),
        bookList: bookListReducer,
    })),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch