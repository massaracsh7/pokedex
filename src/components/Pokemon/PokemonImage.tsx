import React from 'react';

interface PokemonImageProps {
  pokemon: { sprites: { front_default: string }; name: string };
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  return (
    <img
      src={pokemon.sprites.front_default}
      loading="lazy"
      alt={pokemon.name}
    />
  );
};

export default PokemonImage;
