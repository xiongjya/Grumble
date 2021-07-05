import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'filtered',
  initialState: {
    dietary: [],
    distance: 500,
    latitude: 0,
    longitude: 0,
    location: ''
  },
  reducers: {
    addDietary: (state, option) => {
        state.dietary.push(option.payload);
    },
    removeDietary: (state, option) => {
        state.dietary = state.dietary.filter(x => x !== option.payload);
    },
    clearDietary: (state) => {
        state.dietary = [];
    },
    addLatitude: (state, value) => {
        state.latitude = value.payload;
    },
    addLongitude: (state, value) => {
      state.longitude = value.payload;
    },
    addLocation: (state, value) => {
        state.location = value.payload;
    },
    addDistance: (state, value) => {
        state.distance = value.payload;
    }
  },
});

export const { addDietary, addDistance, addLatitude, addLongitude, addLocation, 
               removeDietary, clearDietary } = slice.actions;

export const selectDietary = state => state.filtered.dietary;
export const selectDistance = state => state.filtered.distance;
export const selectLatitude = state => state.filtered.latitude;
export const selectLongitude = state => state.filtered.longitude;
export const selectLocation= state => state.filtered.location;

export default slice.reducer;