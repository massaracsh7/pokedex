import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonApi } from '@/redux/pokemonApi';
import { Pokemon, PokemonResult } from '@/types/types';

interface PokemonState {
  loading: boolean;
  cards: PokemonResult[];
  pokemonDetails: Record<string, Pokemon>;
  offset: number;
  search: string;
  error: string | null;
}

const initialState: PokemonState = {
  loading: false,
  cards: [],
  pokemonDetails: {},
  offset: 0,
  search: '',
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCards(state, action: PayloadAction<PokemonResult[]>) {
      state.cards = [...state.cards, ...action.payload];
    },
    incrementOffset(state) {
      state.offset += 20;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        pokemonApi.endpoints.fetchPokemons.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemons.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.cards = [...state.cards, ...action.payload.results];
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemons.matchRejected,
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchFulfilled,
        (state, { payload }) => {
          state.loading = false;
          if (payload) {
            state.pokemonDetails[payload.name] = payload;
          }
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchRejected,
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setSearch, incrementOffset, setCards } = pokemonSlice.actions;
export default pokemonSlice.reducer;
