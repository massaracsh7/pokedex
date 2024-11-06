import FavoriteList from '@/components/FavoriteList/FavoriteList';
import styles from './FavoritePage.module.scss';

const FavoritePage: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.inner}>
        <h1 className={styles.title}> Favorite Pokemons </h1>
        <FavoriteList />
      </div>
    </div>
  );
};

export default FavoritePage;
