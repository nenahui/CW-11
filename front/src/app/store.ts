import { categoriesSlice } from '@/features/categories/categoriesSlice.ts';
import { productSlice } from '@/features/Product/productSlice.ts';
import { usersSlice } from '@/features/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key: 'auth:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersSlice.reducer),
  categories: categoriesSlice.reducer,
  product: productSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
