import PokemonsList from '@/components/PokemonsList';
import SearchInput from '@/components/SearchInput';
import FilterTypes from '@/components/FilterTypes';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.inner}>
        <FilterTypes /> <SearchInput />
      </div>
      <PokemonsList />
    </div>
  );
};

export default MainPage;
