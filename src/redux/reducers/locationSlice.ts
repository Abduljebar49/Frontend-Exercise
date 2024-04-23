// locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: null,
  country: null,
  lat: null,
  lng: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationInfo: (state, action) => {
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    fetchLocationInfo: () => {},
  },
});

export const { setLocationInfo, fetchLocationInfo } = locationSlice.actions;

export default locationSlice.reducer;
