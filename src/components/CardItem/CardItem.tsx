import { useFetchById } from '@/redux/pokemonApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PokemonResult } from '@/types/types';
import { Link } from 'react-router-dom';

interface CardItemProps {
  pokemon: PokemonResult;
}

const CardItem: React.FC<CardItemProps> = ({ pokemon }) => {
  const cachedPokemon = useSelector(
    (state: RootState) => state.storeReducer.pokemonDetails[pokemon.name],
  );
  const loading = useSelector((state: RootState) => state.storeReducer.loading);
  const error = useSelector((state: RootState) => state.storeReducer.error);
  const { data, isLoading, isError } = useFetchById(pokemon.url, {
    skip: !!cachedPokemon,
  });

  const pokemonData = cachedPokemon || data;

  if (loading || isLoading) return <p>Loading...</p>;
  if (error || isError) return <p>Error loading Pokémon data.</p>;

  return (
    <Link to={`pokemon/${pokemonData?.name}`}>
      <li className="card-item">
        <h2>{pokemonData?.name}</h2>
        <img
          src={pokemonData?.sprites.front_default}
          loading="lazy"
          alt={pokemonData?.name}
        />
        <p>
          Type: {pokemonData?.types.map((item) => item.type.name).join(', ')}
        </p>
      </li>
    </Link>
  );
};

export default CardItem;
