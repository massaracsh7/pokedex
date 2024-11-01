import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/utils/constants';
import { ApiResponse, Pokemon } from '@/types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    fetchPokemons: builder.query<ApiResponse, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    fetchPokemonById: builder.query<Pokemon, {url:string}>({
      query: (url) => `${url}`,
    }),
  }),
})

export const useFetchPokemons = pokemonApi.endpoints.fetchPokemons.useQuery;
export const useFetchById = pokemonApi.endpoints.fetchPokemonById.useQuery;