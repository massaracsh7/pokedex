import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storeReducer from './Slice';
import typeReducer from './typeSlice';
import { pokemonApi } from './pokemonApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  storeReducer,
  typeReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
