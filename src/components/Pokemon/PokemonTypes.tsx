import React from 'react';

interface PokemonTypesProps {
  types: { type: { name: string } }[];
}

const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return <p>Type: {types.map((item) => item.type.name).join(', ')}</p>;
};

export default PokemonTypes;
