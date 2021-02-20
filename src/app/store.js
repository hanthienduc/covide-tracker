import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/countrySlice';
import tableReducer from '../features/tableSlice';
import chartDataReducer from '../features/chartDataSlice';
import mapReducer from '../features/mapSlice';

export default configureStore({
  reducer: {
    country: countryReducer,
    table: tableReducer,
    chart: chartDataReducer,
    map: mapReducer
  },
});
