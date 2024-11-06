import React from 'react';
import styles from './PokemonTypes.module.scss';

interface PokemonTypesProps {
  types: { type: { name: string } }[];
}

const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <div className={styles.types}>
      {types.map((item) => (
        <span key={item.type.name} className={styles.type}>
          {item.type.name}
        </span>
      ))}
    </div>
  );
};

export default PokemonTypes;
