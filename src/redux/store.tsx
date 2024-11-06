import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import typeReducer from './typeSlice';
import favoriteReducer from './favoriteSlice';
import { pokemonApi } from './pokemonApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  pokemonReducer,
  typeReducer,
  favoriteReducer,
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
