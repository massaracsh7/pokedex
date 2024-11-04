import { PokemonResult } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favorites: PokemonResult[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<PokemonResult>) {
      const isFavorite = state.favorites.some(
        (pokemon) => pokemon.name === action.payload.name,
      );

      if (isFavorite) {
        state.favorites = state.favorites.filter(
          (pokemon) => pokemon.name !== action.payload.name,
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
