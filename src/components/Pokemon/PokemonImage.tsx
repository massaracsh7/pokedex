import React from 'react';
import styles from './PokemonImage.module.scss';
interface PokemonImageProps {
  pokemon: { sprites: { front_default: string }; name: string };
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  return (
    <img
      className={styles.image}
      src={pokemon.sprites.front_default}
      loading="lazy"
      alt={pokemon.name}
    />
  );
};

export default PokemonImage;
