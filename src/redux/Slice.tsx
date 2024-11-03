import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonResult } from '@/types/types';

interface PokemonState {
  loading: boolean;
  cards: PokemonResult[];
  pokemonDetails: Record<string, Pokemon>;
  offset: number;
  search: string;
}

const initialState: PokemonState = {
  loading: false,
  cards: [],
  pokemonDetails: {},
  offset: 0,
  search: ''
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCards(state, action: PayloadAction<PokemonResult[]>) {
      state.cards = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    addPokemonDetails(state, action: PayloadAction<Pokemon>) {
      state.pokemonDetails[action.payload.name] = action.payload;
    },
    incrementOffset(state) {
      state.offset += 20;
    },
  },
});

export const { setLoading, setCards, addPokemonDetails, incrementOffset, setSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;
