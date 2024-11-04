import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/favoriteSlice';
import { RootState } from '@/redux/store';
import { Pokemon, PokemonResult } from '@/types/types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
    };
    dispatch(toggleFavorite(favoritePokemon));
  };

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        loading="lazy"
        alt={pokemon.name}
      />
      <p>Type: {pokemon.types.map((item) => item.type.name).join(', ')}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>
        Ability: {pokemon.abilities.map((item) => item.ability.name).join(', ')}
      </p>
      <div>
        <h3>Base Characteristics:</h3>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleFavoriteToggle}
        aria-label="Toggle Favorite"
        className="favorite-button"
      >
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
      </button>
    </div>
  );
};

export default DetailInfo;
