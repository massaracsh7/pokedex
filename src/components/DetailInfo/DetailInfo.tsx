import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/favoriteSlice';
import { RootState } from '@/redux/store';
import { Pokemon, PokemonResult } from '@/types/types';
import { API_URL } from '@/utils/constants';
import {
  FavoriteButton,
  PokemonImage,
  PokemonTypes,
  PokemonStats,
} from '@/components/Pokemon';

interface DetailProps {
  pokemon: Pokemon;
}

const DetailInfo: React.FC<DetailProps> = ({ pokemon }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );
  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

  const handleFavoriteToggle = () => {
    const favoritePokemon: PokemonResult = {
      name: pokemon.name,
      url: `${API_URL}/pokemon/${pokemon.id}`,
    };
    dispatch(toggleFavorite(favoritePokemon));
  };

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <PokemonImage pokemon={pokemon} />
      <PokemonTypes types={pokemon.types} />
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>
        Ability: {pokemon.abilities.map((item) => item.ability.name).join(', ')}
      </p>
      <PokemonStats stats={pokemon.stats} />
      <FavoriteButton isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
    </div>
  );
};

export default DetailInfo;
