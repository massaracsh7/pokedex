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
import {
  makeSelectPokemonDetails,
  makeSelectFavorites,
  makeSelectLoadingStatus,
  makeSelectError,
} from '@/redux/selectors';

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

  if (status === 'loading' || isLoading) return <p>Loading...</p>;
  if (status === 'failed' || isError || error)
    return <p>Error loading Pokémon data.</p>;

  return (
    <li className="card-item">
      {pokemonData ? (
        <>
          <Link to={`${linkPrefix}/${pokemonData.name}`}>
            <h2>{pokemonData.name}</h2>
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
