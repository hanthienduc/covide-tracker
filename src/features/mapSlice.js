import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
    countries: null,
  },
  reducers: {
    storeMapCenter: (state, action) => {
      state.center = action.payload;
    },
    storeMapZoom: (state, action) => {
      state.zoom = action.payload;
    },
    storeMapCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { storeMapCountries, storeMapCenter, storeMapZoom } = mapSlice.actions;

export const selectMapCenter = (state) => state.map.center;
export const selectMapZoom = (state) => state.map.zoom;
export const selectMapCountries = (state) => state.map.countries;

export default mapSlice.reducer;
