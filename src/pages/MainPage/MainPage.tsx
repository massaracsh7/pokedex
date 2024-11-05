import PokemonsList from '@/components/PokemonsList';
import SearchInput from '@/components/SearchInput';
import FilterTypes from '@/components/FilterTypes';

const MainPage: React.FC = () => {
  return (
    <>
      <div>MainPage</div>
      <SearchInput />
      <FilterTypes />
      <PokemonsList />
    </>
  );
};

export default MainPage;
