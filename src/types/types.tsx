export interface PokemonResult {
  name: string; 
  url: string;
}

export type PageNumber = string | null;

export interface ApiResponse {
  count: number;
  next: PageNumber; 
  previous: PageNumber;
  results: PokemonResult[];
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
}

interface Sprites {
  front_default: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  moves: Move[];
  sprites: Sprites;
  types: PokemonType[];
}

export interface typePokemon {
  'name': string,
  'id': string,
  'pokemon': PokemonType[],
}