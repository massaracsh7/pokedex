import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '@/utils/constants';
import { PokemonResult } from '@/types/types';
import { pokemonApi } from './pokemonApi';

const initialState = {
  loading: false,
  cards: [] as PokemonResult[],
  offset: 0,
  limit: 20,
  baseName: API_URL,
  textError: 'Sorry, Your pokemon is not found. Please, try again.',
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    incrementOffset(state) {
      state.offset += state.limit;
    },
    setCards(state, action) {
      state.cards = [...state.cards, ...action.payload];
    },
    setBaseName(state, action) {
      state.baseName = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetCards(state) {
      state.cards = [];
      state.offset = 0; 
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.fetchPokemons.matchFulfilled,
      (state, { payload }) => {
        state.cards = [...state.cards, ...payload.results];
        state.offset += state.limit;
      },
    );
  },
});

export default Slice.reducer;
export const { incrementOffset, setCards, setBaseName, setLoading, resetCards } = Slice.actions;
