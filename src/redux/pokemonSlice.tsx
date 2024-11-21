import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonApi } from '@/redux/pokemonApi';
import { LoadStatus, Pokemon, PokemonResult } from '@/types/types';

interface PokemonState {
  status: LoadStatus;
  cards: PokemonResult[];
  pokemonDetails: Record<string, Pokemon>;
  offset: number;
  search: string;
  error: string | null;
}

const loadPokemons = (): Record<string, Pokemon> => {
  const details = localStorage.getItem('pokemonDetails');
  return details ? JSON.parse(details) : {};
};

const savePokemons = (pokemonDetails: Record<string, Pokemon>) => {
  localStorage.setItem('pokemonDetails', JSON.stringify(pokemonDetails));
};

const initialState: PokemonState = {
  status: 'idle',
  cards: [],
  pokemonDetails: loadPokemons(),
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
    incrementOffset(state) {
      state.offset += 20;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(pokemonApi.endpoints.fetchPokemons.matchPending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(
        pokemonApi.endpoints.fetchPokemons.matchFulfilled,
        (state, action) => {
          state.status = 'success';
          state.cards = [...state.cards, ...action.payload.results];
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemons.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error?.message || 'Failed to fetch Pokémon data';
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchPending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchFulfilled,
        (state, { payload }) => {
          state.status = 'success';
          if (payload) {
            state.pokemonDetails[payload.name] = payload;
            savePokemons(state.pokemonDetails);
          }
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error =
            action.error?.message || 'Failed to fetch Pokémon details';
        },
      );
  },
});

export const { setSearch, incrementOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;
