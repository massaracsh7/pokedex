import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchByName, useFetchPokemons } from "@/redux/pokemonApi";
import { RootState } from "@/redux/store";
import { incrementOffset } from "@/redux/Slice";
import CardItem from "../CardItem";
import { API_URL } from "@/utils/constants";
import { debounce } from "lodash"; 
import { PokemonResult } from "@/types/types";

const CardsList = () => {
  const dispatch = useDispatch();
  const limit = 20;
  const [searchResults, setSearchResults] = useState<PokemonResult[]>([]);
  const { search, offset, cards, loading } = useSelector((state: RootState) => state.storeReducer);
  const { data, isLoading } = useFetchPokemons({ offset, limit });
  const { data: searchData } = useFetchByName(search);

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

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading &&
        !search
      ) {
        dispatch(incrementOffset());
      }
    }, 200),
    [isLoading, search, dispatch]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [isLoading, search, dispatch, handleScroll]);

  const pokemonToDisplay = searchResults.length > 0 ? searchResults : cards;

  return (
    <div>
      <h2>Pokémon List</h2>
      {!isLoading && search && searchResults.length === 0 && (
        <p>No Pokémon found for "{search}"</p>
      )}
      <ul className="cards__list">
        {pokemonToDisplay.map((pokemon, index) => {
          const uniqueId = pokemon.url.split("/").slice(-2, -1)[0];
          return <CardItem pokemon={pokemon} key={`${uniqueId}-${index}`} />;
        })}
      </ul>
      {(loading || isLoading) && <p>Loading...</p>}
    </div>
  );
};

export default CardsList;
