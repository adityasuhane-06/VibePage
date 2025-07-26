import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import blogReducer from "./features/Blog/blog";
import blogInteractionReducer from "./features/Blog/BlogInteraction";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'auth',
    storage,
    whitelist:['auth']
}

const rootReducer=combineReducers({
    auth:authReducer,
    blog:blogReducer,
    blogInteraction:blogInteractionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
})

export const persistor = persistStore(store);