import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataReducer from './slices/dataSlice';
import {persistMiddleware} from './middleware/persistMiddleware';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['data'], // Only persist data reducer
  blacklist: [], // Don't persist these reducers
};

// Combine reducers
const rootReducer = combineReducers({
  data: dataReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(persistMiddleware),
  devTools: __DEV__,
});

// Create persistor
export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks
export {useAppDispatch, useAppSelector} from './hooks';
