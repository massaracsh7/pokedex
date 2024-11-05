import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeResults, LoadStatus } from '@/types/types';
import { pokemonApi } from '@/redux/pokemonApi';

interface TypeState {
  types: TypeResults[];
  status: LoadStatus;
  error: string;
  selectedType: string;
}

const initialState: TypeState = {
  types: [],
  status: 'idle',
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
        state.status = 'loading';
      })
      .addMatcher(
        pokemonApi.endpoints.fetchTypes.matchFulfilled,
        (state, action) => {
          state.status = 'success';
          state.types = action.payload.results;
        },
      )
      .addMatcher(
        pokemonApi.endpoints.fetchTypes.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch types';
        },
      );
  },
});

export const { setSelectedType } = typeSlice.actions;
export default typeSlice.reducer;
