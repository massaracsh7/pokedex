import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeResults } from '@/types/types';
import { pokemonApi } from '@/redux/pokemonApi';

interface TypeState {
  types: TypeResults[];
  loading: boolean;
  error: string;
  selectedType: string;
}

const initialState: TypeState = {
  types: [],
  loading: false,
  error: '',
  selectedType: '',
};

const typeSlice = createSlice({
  name: 'typeSlice',
  initialState,
  reducers: {
    setSelectedType(state, action: PayloadAction<string>) {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(pokemonApi.endpoints.fetchTypes.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        pokemonApi.endpoints.fetchTypes.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.types = action.payload.results;
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchTypes.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch types';
        },
      );
  },
});

export const { setSelectedType } = typeSlice.actions;
export default typeSlice.reducer;
