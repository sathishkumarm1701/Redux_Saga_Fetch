import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface State {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchData: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      console.log(action.payload);
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export default dataSlice.reducer;
