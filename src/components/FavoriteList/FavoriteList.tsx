import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import CardItem from '../CardItem';

const FavoriteList: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favoriteReducer.favorites,
  );

  return (
    <ul className="favorite__list">
      {favorites.map((pokemon, index) => {
        const uniqueId = pokemon.url.split('/').slice(-2, -1)[0];
        return <CardItem key={`${uniqueId}-${index}`} pokemon={pokemon} />;
      })}
    </ul>
  );
};

export default FavoriteList;
