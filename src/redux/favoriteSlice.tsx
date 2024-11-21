import { PokemonResult } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favorites: PokemonResult[];
}

const loadFavorites = (): PokemonResult[] => {
  const faves = localStorage.getItem('favoritePokemons');
  return faves ? JSON.parse(faves) : [];
};

const saveFavorites = (favorites: PokemonResult[]) => {
  localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
};

const initialState: FavoriteState = {
  favorites: loadFavorites(),
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
      saveFavorites(state.favorites);
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
