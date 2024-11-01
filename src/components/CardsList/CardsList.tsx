import { useFetchPokemons } from "@/redux/pokemonApi";
import { RootState } from "@/redux/store";
import { PokemonResult } from "@/types/types"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CardsList = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState<PokemonResult[]>([]);
  const limit = 20; 
  const { data, isLoading } = useFetchPokemons({ offset, limit });

  useEffect(() => {
    if (data) {
      setAllPokemons((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul className='cards__list'>
        {allPokemons.map((item) => (
          <li key={item.name}>
            {item.name} - {item.url}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CardsList;
