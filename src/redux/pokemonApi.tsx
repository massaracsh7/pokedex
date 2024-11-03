import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/utils/constants';
import { ApiResponse, Pokemon, typePokemon } from '@/types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  keepUnusedDataFor: import.meta.env.MODE === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    fetchPokemons: builder.query<
      ApiResponse,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    fetchPokemonById: builder.query<Pokemon, string>({
      query: (url) => url,
    }),
    fetchPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),
    fetchTypes: builder.query<typePokemon, string>({
      query: () => `types/`,
    }),
  }),
});

export const useFetchPokemons = pokemonApi.endpoints.fetchPokemons.useQuery;
export const useFetchById = pokemonApi.endpoints.fetchPokemonById.useQuery;
export const useFetchByName = pokemonApi.endpoints.fetchPokemonByName.useQuery;
