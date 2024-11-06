import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchByName,
  useFetchPokemons,
  useFetchTypesById,
} from '@/redux/pokemonApi';
import { RootState } from '@/redux/store';
import { incrementOffset } from '@/redux/pokemonSlice';
import { API_URL } from '@/utils/constants';
import { debounce } from 'lodash';
import { PokemonResult } from '@/types/types';
import CardList from '../CardList';

const CardsList: React.FC = () => {
  const dispatch = useDispatch();
  const limit = 20;
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonResult[]>([]);
  const { search, offset, cards, status } = useSelector(
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
      status !== 'loading' &&
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
      {status === 'failed' && <p>Error loading Pokémon data</p>}
      {!isLoading && search && filteredPokemons.length === 0 && (
        <p>No Pokémon found for "{search}"</p>
      )}
      <CardList pokemons={filteredPokemons} />
      {status === 'loading' && <p>Loading Pokémon...</p>}
    </div>
  );
};

export default CardsList;
