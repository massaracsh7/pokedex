import React from 'react';
import CardItem from '../CardItem';
import { PokemonResult } from '@/types/types';

interface CardListProps {
  pokemons: PokemonResult[];
}

const CardList: React.FC<CardListProps> = ({ pokemons }) => {
  return (
    <ul>
      {pokemons.map((pokemon, index) => {
        const uniqueId = pokemon.url.split('/').slice(-2, -1)[0];
        return <CardItem key={`${uniqueId}-${index}`} pokemon={pokemon} />;
      })}
    </ul>
  );
};

export default CardList;
