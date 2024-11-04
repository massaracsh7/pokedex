import { useFetchById } from '@/redux/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PokemonResult } from '@/types/types';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '@/redux/favoriteSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface CardItemProps {
  pokemon: PokemonResult;
  linkPrefix?: string;
}

const CardItem: React.FC<CardItemProps> = ({
  pokemon,
  linkPrefix = '/pokemon',
}) => {
  const dispatch = useDispatch();
  const cachedPokemon = useSelector(
    (state: RootState) => state.pokemonReducer.pokemonDetails[pokemon.name],
  );
  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );
  const loading = useSelector(
    (state: RootState) => state.pokemonReducer.loading,
  );
  const error = useSelector((state: RootState) => state.pokemonReducer.error);
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

  if (loading || isLoading) return <p>Loading...</p>;
  if (error || isError) return <p>Error loading Pokémon data.</p>;

  return (
    <li className="card-item">
      <Link to={`${linkPrefix}/${pokemonData?.name}`}>
        <h2>{pokemonData?.name}</h2>
        <img
          src={pokemonData?.sprites.front_default}
          loading="lazy"
          alt={pokemonData?.name}
        />
        <p>
          Type: {pokemonData?.types.map((item) => item.type.name).join(', ')}
        </p>
      </Link>
      <button
        onClick={handleFavoriteToggle}
        aria-label="Toggle Favorite"
        className="favorite-button"
      >
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
      </button>
    </li>
  );
};

export default CardItem;
