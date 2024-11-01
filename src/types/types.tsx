export interface PokemonResult {
  name: string; 
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null; 
  previous: string | null;
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

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  moves: Move[];
  sprites: Sprites;
}