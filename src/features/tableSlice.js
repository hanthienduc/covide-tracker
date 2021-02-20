import { createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    table: null,
  },
  reducers: {
    storeTable: (state, action) => {
      state.table = action.payload;
    },
    
  },
});

export const { storeTable } = tableSlice.actions;

export const selectTable = (state) => state.table.table;

export default tableSlice.reducer;
