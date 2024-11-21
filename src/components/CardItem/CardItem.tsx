import { useFetchById } from '@/redux/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PokemonResult } from '@/types/types';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '@/redux/favoriteSlice';
import {
  FavoriteButton,
  PokemonImage,
  PokemonTypes,
} from '@/components/Pokemon';
import Loader from '@/components/Loader';
import {
  makeSelectPokemonDetails,
  makeSelectFavorites,
  makeSelectLoadingStatus,
  makeSelectError,
} from '@/redux/selectors';

import styles from './CardItem.module.scss';

interface CardItemProps {
  pokemon: PokemonResult;
  linkPrefix?: string;
}

const CardItem: React.FC<CardItemProps> = ({
  pokemon,
  linkPrefix = '/pokemon',
}) => {
  const dispatch = useDispatch();

  const cachedPokemonSelector = makeSelectPokemonDetails();
  const favoritesSelector = makeSelectFavorites();
  const loadingStatusSelector = makeSelectLoadingStatus();
  const errorSelector = makeSelectError();

  const cachedPokemon = useSelector((state: RootState) =>
    cachedPokemonSelector(state, pokemon.name),
  );
  const favorites = useSelector(favoritesSelector);
  const status = useSelector(loadingStatusSelector);
  const error = useSelector(errorSelector);

  const { data, isLoading, isError } = useFetchById(pokemon.url, {
    skip: !!cachedPokemon,
  });

  const pokemonData = cachedPokemon || data;

  const isFavorite = favorites.some(
    (fav: PokemonResult) => fav.name === pokemon?.name,
  );

  const handleFavoriteToggle = () => {
    if (pokemonData) {
      dispatch(toggleFavorite(pokemon));
    }
  };

  if (status === 'loading' || isLoading) {
    return <Loader isLoading={true} height="40%" width="40%" />;
  }

  if (status === 'failed' || isError || error) {
    return (
      <div className={styles.card__error}>
        Error loading Pokémon data: {error || 'Unknown error'}
      </div>
    );
  }

  return (
    <li className={styles.card}>
      {pokemonData ? (
        <>
          <Link
            to={`${linkPrefix}/${pokemonData.name}`}
            className={styles.card__link}
          >
            <h2 className={styles.card__name}>{pokemonData.name}</h2>
            <PokemonImage pokemon={pokemonData} />
            <PokemonTypes types={pokemonData.types} />
          </Link>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteToggle}
          />
        </>
      ) : (
        <p>Pokemon data not available</p>
      )}
    </li>
  );
};

export default CardItem;
