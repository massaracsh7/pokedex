import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '@/utils/constants';
import { Pokemon, PageNumber, PokemonResult } from '@/types/types';
import { pokemonApi } from './pokemonApi';

const initialState = {
  loading: false,
  cards: [] as PokemonResult[],
  pagination: {
    AllPages: 1,
    pages: 1,
    next: '' as PageNumber,
    prev: '' as PageNumber,
  },
  countItems: 20,
  baseName: API_URL,
  textError: 'Sorry, Your pokemon is not found. Please, ',
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCountItems(state, action) {
      state.countItems = action.payload;
    },
    setCurrentPage(state, action) {
      state.pagination.pages = action.payload;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    setBaseName(state, action) {
      state.baseName = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.fetchPokemons.matchFulfilled,
      (state, { payload }) => {
        state.cards = payload.results;
      },
    );
  },
});

export default Slice.reducer;
export const { setCountItems, setCurrentPage, setCards, setBaseName, setLoading } =
  Slice.actions;