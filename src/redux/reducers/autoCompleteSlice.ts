// reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface AutocompleteState {
  inputValue: string;
  options: any[]; // Adjust this type according to the API response structure
  loading: boolean;
  error: string | null;
}

const initialState: AutocompleteState = {
  inputValue: '',
  options: [],
  loading: false,
  error: null,
};

const autocompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setOptions(state, action: PayloadAction<any[]>) {
      state.options = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    fetchOptions(state, action: PayloadAction<string>) {
      state.loading = true;
    },
  },
});

export const { setInputValue, setOptions, setLoading, setError, fetchOptions } = autocompleteSlice.actions;

export const selectInputValue = (state: RootState) => state.autocomplete.inputValue;
export const selectOptions = (state: RootState) => state.autocomplete.options;

export default autocompleteSlice.reducer;
