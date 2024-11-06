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
import styles from './DetailInfo.module.scss';

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
    <div className={styles.detail}>
      <h2 className={styles.detail__title}>{pokemon.name}</h2>
      <PokemonImage pokemon={pokemon} />
      <PokemonTypes types={pokemon.types} />
      <div className={styles.detail__inner}>
        <div>
          <p className={styles.detail__info}>
            <b>Weight:</b> {pokemon.weight}
          </p>
          <p className={styles.detail__info}></p>
          <b>Height:</b> {pokemon.height}
          <p className={styles.detail__info}>
            <b>Ability: </b>
            {pokemon.abilities.map((item) => item.ability.name).join(', ')}
          </p>
        </div>
        <PokemonStats stats={pokemon.stats} />
      </div>
      <FavoriteButton isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
    </div>
  );
};

export default DetailInfo;
