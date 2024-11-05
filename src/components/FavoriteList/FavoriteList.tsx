import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import CardList from '../CardList';

const FavoriteList: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );

  return <CardList pokemons={favorites} />;
};

export default FavoriteList;
