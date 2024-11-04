import { Pokemon } from '@/types/types';
import React from 'react';
interface DetailProps {
  pokemon: Pokemon;
}
const DetailInfo: React.FC<DetailProps> = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        loading="lazy"
        alt={pokemon.name}
      />
      <p>Type: {pokemon.types.map((item) => item.type.name).join(', ')}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>
        Ability: {pokemon.abilities.map((item) => item.ability.name).join(', ')}
      </p>
      <div>
        <h3>Base Characteristics:</h3>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailInfo;
