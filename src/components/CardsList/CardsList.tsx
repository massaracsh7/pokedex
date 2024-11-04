import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchByName,
  useFetchPokemons,
  useFetchTypesById,
} from '@/redux/pokemonApi';
import { RootState } from '@/redux/store';
import { incrementOffset } from '@/redux/pokemonSlice';
import CardItem from '../CardItem';
import { API_URL } from '@/utils/constants';
import { debounce } from 'lodash';
import { PokemonResult } from '@/types/types';

const CardsList: React.FC = () => {
  const dispatch = useDispatch();
  const limit = 20;
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonResult[]>([]);
  const { search, offset, cards, loading } = useSelector(
    (state: RootState) => state.pokemonReducer,
  );
  const selectedType = useSelector(
    (state: RootState) => state.typeReducer.selectedType,
  );

  const { isLoading } = useFetchPokemons({ offset, limit });
  const { data: searchData } = useFetchByName(search);
  const { data: typeData } = useFetchTypesById(selectedType || '');

  useEffect(() => {
    if (search) {
      if (searchData) {
        const { id, name } = searchData;
        setFilteredPokemons(
          id && name ? [{ name, url: `${API_URL}/pokemon/${id}` }] : [],
        );
      } else {
        setFilteredPokemons([]);
      }
    } else if (
      selectedType &&
      typeData?.pokemon &&
      Array.isArray(typeData.pokemon)
    ) {
      const typeFilteredPokemons = typeData.pokemon.map(({ pokemon }) => ({
        name: pokemon.name,
        url: pokemon.url,
      }));
      setFilteredPokemons(typeFilteredPokemons);
    } else {
      setFilteredPokemons(cards);
    }
  }, [search, searchData, selectedType, typeData, cards]);

  const debouncedHandleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading &&
      !search
    ) {
      dispatch(incrementOffset());
    }
  }, 200);

  const handleScroll = useCallback(() => {
    debouncedHandleScroll();
  }, [debouncedHandleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      debouncedHandleScroll.cancel();
    };
  }, [debouncedHandleScroll, handleScroll]);

  return (
    <div>
      <h2>Pokémon List</h2>
      {!isLoading && search && filteredPokemons.length === 0 && (
        <p>No Pokémon found for "{search}"</p>
      )}
      <ul className="cards__list">
        {filteredPokemons.map((pokemon, index) => {
          const uniqueId = pokemon.url.split('/').slice(-2, -1)[0];
          return <CardItem key={`${uniqueId}-${index}`} pokemon={pokemon} />;
        })}
      </ul>
      {(loading || isLoading) && <p>Loading...</p>}
    </div>
  );
};

export default CardsList;
