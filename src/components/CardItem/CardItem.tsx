import { useFetchById } from "@/redux/pokemonApi";
import { PokemonResult } from '@/types/types';

interface CardItemProps {
  pokemon: PokemonResult;
}

const CardItem = ({ pokemon }: CardItemProps) => {
  const { data, isLoading, isError, isSuccess } = useFetchById(pokemon.url);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading Pokémon data.</p>;

  if (isSuccess && data) {
    return (
      <div>
        <h2>{data.name}</h2>
        <img src={data.sprites.front_default} alt={data.name} />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
      </div>
    );
  }

  return null;
};

export default CardItem;
