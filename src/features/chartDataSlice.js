import { createSlice } from "@reduxjs/toolkit";

export const chartDataSlice = createSlice({
  name: "chart",
  initialState: {
    data: null,
  },
  reducers: {
    storeChartData: (state, action) => {
      state.Data = action.payload;
    },
    
  },
});

export const { storeChartData } = chartDataSlice.actions;

export const selectChartData = (state) => state.chart.data;

export default chartDataSlice.reducer;
