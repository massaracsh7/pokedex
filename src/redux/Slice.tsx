import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonResult } from '@/types/types';

interface PokemonState {
  loading: boolean;
  cards: PokemonResult[];
  pokemonDetails: Record<string, Pokemon>;
  offset: number;
}

const initialState: PokemonState = {
  loading: false,
  cards: [],
  pokemonDetails: {},
  offset: 0,
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
    addPokemonDetails(state, action: PayloadAction<Pokemon>) {
      state.pokemonDetails[action.payload.name] = action.payload;
    },
    incrementOffset(state) {
      state.offset += 20;
    },
  },
});

export const { setLoading, setCards, addPokemonDetails, incrementOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;
