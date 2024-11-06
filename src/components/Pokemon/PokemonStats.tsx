import React from 'react';
import styles from './PokemonStats.module.scss';

interface PokemonStatsProps {
  stats: { stat: { name: string }; base_stat: number }[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <div>
      <h3>Base Characteristics:</h3>
      <ul className={styles.stats}>
        {stats.map((stat) => (
          <li key={stat.stat.name} className={styles.stats__item}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
