import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'filtered',
  initialState: {
    dietary: [],
    dining: [],
    distance: 0.5,
    location: '',
    rating: 0
  },
  reducers: {
    addDietary: (state, option) => {
        state.dietary.push(option.payload);
    },
    addDining: (state, option) => {
        state.dining.push(option.payload);
    },
    removeDietary: (state, option) => {
        state.dietary = state.dietary.filter(x => x !== option.payload);
    },
    removeDining: (state, option) => {
        state.dining = state.dining.filter(y => y !== option.payload);
    },
    addLocation: (state, value) => {
      state.location = value.payload;
    },
    addDistance: (state, value) => {
        state.distance = value.payload;
    },
    addRating: (state, value) => {
        state.rating = value.payload;
    }
  },
});

export const { addDietary, addDining, addDistance, addRating, addLocation, removeDietary, removeDining } = slice.actions;

export const selectDietary = state => state.filtered.dietary;
export const selectDining = state => state.filtered.dining;
export const selectDistance = state => state.filtered.distance;
export const selectLocation = state => state.filtered.location;
export const selectRating = state => state.filtered.rating;

export default slice.reducer;