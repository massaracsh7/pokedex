import { createSelector } from 'reselect';
import { RootState } from './store';
import { PokemonDetails, StatusType, Favorite } from '@/types/types'; // Adjust as per actual types in your project

export const selectPokemonDetails = (
  state: RootState,
  name: string,
): PokemonDetails | undefined => state.pokemonReducer.pokemonDetails[name];

export const selectFavorites = (state: RootState): Favorite[] =>
  state.favoriteReducer.favorites;

export const selectLoadingStatus = (state: RootState): StatusType =>
  state.pokemonReducer.status;

export const selectError = (state: RootState): string | null =>
  state.pokemonReducer.error;

export const makeSelectPokemonDetails = (): ((
  state: RootState,
  name: string,
) => PokemonDetails | undefined) =>
  createSelector(
    [selectPokemonDetails],
    (details): PokemonDetails | undefined => {
      if (Array.isArray(details)) {
        return details.find((pokemon) => pokemon.name === name);
      }
      return undefined;
    },
  );

export const makeSelectFavorites = (): ((state: RootState) => Favorite[]) =>
  createSelector([selectFavorites], (favorites): Favorite[] => {
    return favorites.map((favorite) => ({
      name: favorite.name,
      url: favorite.url,
    }));
  });

export const makeSelectLoadingStatus = (): ((state: RootState) => string) =>
  createSelector([selectLoadingStatus], (status): string => {
    switch (status) {
      case 'idle':
        return 'idle.';
      case 'loading':
        return 'loading...';
      case 'success':
        return 'success';
      case 'failed':
        return 'failed';
      default:
        return 'Unknown status.';
    }
  });

export const makeSelectError = (): ((state: RootState) => string | null) =>
  createSelector([selectError], (error): string | null => {
    return error ? `Error: ${error}` : null;
  });
