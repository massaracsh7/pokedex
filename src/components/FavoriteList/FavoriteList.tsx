import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import CardList from '../CardList';

const FavoriteList: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );

  if (favorites.length === 0) {
    return (
      <div>
        <p>No favorite items yet.</p>
        <p>
          Browse the list of all pokemons and add your favorite Pokémon here!
        </p>
      </div>
    );
  }

  return <CardList pokemons={favorites} />;
};

export default FavoriteList;
