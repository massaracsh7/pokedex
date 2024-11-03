import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchByName, useFetchPokemons } from "@/redux/pokemonApi";
import { RootState } from "@/redux/store";
import { PokemonResult } from "@/types/types";
import CardItem from "../CardItem";
import { API_URL } from '@/utils/constants';

const CardsList = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState<PokemonResult[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonResult[]>([]);
  const limit = 20;

  const search = useSelector((state: RootState) => state.storeReducer.search);
  const { data, isLoading } = useFetchPokemons({ offset, limit });
  const { data: searchData } = useFetchByName(search);

  useEffect(() => {
    if (data && !search) {
      setAllPokemons((prev) => [...prev, ...data.results]);
    }
  }, [data, search]);

  useEffect(() => {
    if (search) {
      if (searchData) {
        const { id, name } = searchData;
        setSearchResults(id && name ? [{ name, url: `${API_URL}/pokemon/${id}` }] : []);
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchData, search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading && !search) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, search]);

  const pokemonToDisplay = searchResults.length > 0 ? searchResults : allPokemons;

  return (
    <div>
      <h2>Pokémon List</h2>
      {!isLoading && search && searchResults.length === 0 && <p>No Pokémon found for "{search}"</p>}
      <ul className="cards__list">
        {pokemonToDisplay.map((pokemon, index) => {
          const uniqueId = pokemon.url.split("/").slice(-2, -1)[0];
          return <CardItem pokemon={pokemon} key={`${uniqueId}-${index}`} />;
        })}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CardsList;
