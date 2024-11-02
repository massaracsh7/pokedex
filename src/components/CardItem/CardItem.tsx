// CardItem.tsx
import { useEffect } from 'react';
import { useFetchById } from '@/redux/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemonDetails } from '@/redux/Slice';
import { RootState } from '@/redux/store';

interface CardItemProps {
  pokemon: { name: string; url: string };
}

const CardItem = ({ pokemon }: CardItemProps) => {
  const dispatch = useDispatch();
  const cachedPokemon = useSelector((state: RootState) => state.storeReducer.pokemonDetails[pokemon.name]);

  const { data, isLoading, isError } = useFetchById(pokemon.url, {
    skip: !!cachedPokemon, 
  });

  useEffect(() => {
    if (data && !cachedPokemon) {
      dispatch(addPokemonDetails(data)); 
    }
  }, [data, cachedPokemon, dispatch]);

  const pokemonData = cachedPokemon || data;

  if (isLoading && !cachedPokemon) return <p>Loading...</p>;
  if (isError) return <p>Error loading Pokémon data.</p>;

  return (
    <div>
      <h2>{pokemonData?.name}</h2>
      <img src={pokemonData?.sprites.front_default} alt={pokemonData?.name} />
      <p>Type: {pokemonData?.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
};

export default CardItem;
