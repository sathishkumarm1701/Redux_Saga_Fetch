import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './slice';

const rootReducer = combineReducers({
  data: dataReducer,
  // Other reducers can be added here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
