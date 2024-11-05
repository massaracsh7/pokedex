import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__message}>404 - Page Not Found</div>
      <div className={styles.notFound__description}>
        Sorry, the page you are looking for does not exist.
      </div>
      <Link to="/" className={styles.notFound__link}>
        Go back to Main Page
      </Link>
    </div>
  );
};

export default NotFound;
