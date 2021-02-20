import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    country: null,
    casesType: 'cases',
  },
  reducers: {
    storeCountry: (state, action) => {
      state.country = action.payload;
    },
    storeCasesType: (state, action) => {
      state.casesType = action.payload;
    },
    
  },
});

export const { storeCountry,storeCasesType } = countrySlice.actions;

export const selectCountry = (state) => state.country.country;
export const selectCasesType = (state) => state.country.casesType;

export default countrySlice.reducer;
