import React from 'react';

interface PokemonStatsProps {
  stats: { stat: { name: string }; base_stat: number }[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <div>
      <h3>Base Characteristics:</h3>
      <ul>
        {stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
