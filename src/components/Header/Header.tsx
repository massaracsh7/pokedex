import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.header__title}>Pokemons</h1>
        <nav className={styles.navigation}>
          <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <Link to={`/`} aria-label="Main Page">
                All Pokemons
              </Link>
            </li>
            <li className={styles.navigation__item}>
              <Link to={`favorite/`} aria-label="Favorite">
                Favorite
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
