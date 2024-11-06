export interface PokemonResult {
  name: string;
  url: string;
}

export type LoadStatus = 'idle' | 'loading' | 'success' | 'failed';

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

interface StatInfo {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Sprites {
  front_default: string;
}

export interface PokemonSlot {
  pokemon: PokemonResult;
  slot: number;
}
export interface PokemonType {
  pokemon: PokemonSlot[];
}

export interface TypeResults {
  name: string;
  url: string;
}
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  stats: StatInfo[];
  sprites: Sprites;
  types: TypesOfPokemon[];
}

export interface TypesOfPokemon {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
export interface ApiResponseType {
  count: number;
  next: PageNumber;
  previous: PageNumber;
  results: TypeResults[];
}

export type PokemonDetails = Pokemon;
export type StatusType = LoadStatus;
export type Favorite = PokemonResult;
