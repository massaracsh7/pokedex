import CardsList from '@/components/CardsList';
import SearchInput from '@/components/SearchInput';
import FilterTypes from '@/components/FilterTypes';

const MainPage: React.FC = () => {
  return (
    <>
      <div>MainPage</div>
      <SearchInput />
      <FilterTypes />
      <CardsList />
    </>
  );
};

export default MainPage;
