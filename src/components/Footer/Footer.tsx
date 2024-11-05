import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p className={styles.footer__copy}>
          &copy; {new Date().getFullYear()} Pokedex.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
