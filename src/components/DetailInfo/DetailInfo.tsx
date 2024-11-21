import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleFavorite } from '@/redux/favoriteSlice';
import { PokemonResult } from '@/types/types';
import {
  FavoriteButton,
  PokemonImage,
  PokemonTypes,
  PokemonStats,
} from '@/components/Pokemon';
import Loader from '@/components/Loader';
import styles from './DetailInfo.module.scss';

const DetailInfo: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch();

  const pokemon = useSelector(
    (state: RootState) => state.pokemonReducer.pokemonDetails[name || ''],
  );

  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );

  const isFavorite = pokemon
    ? favorites.some((fav: PokemonResult) => fav.name === pokemon.name)
    : false;

  const handleFavoriteToggle = () => {
    if (!pokemon) return;
    const favoritePokemon: PokemonResult = {
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
    };
    dispatch(toggleFavorite(favoritePokemon));
  };

  if (!pokemon) {
    return <Loader isLoading={true} height="40%" width="40%" />;
  }

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
          <p className={styles.detail__info}>
            <b>Height:</b> {pokemon.height}
          </p>
          <p className={styles.detail__info}>
            <b>Ability:</b>{' '}
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
