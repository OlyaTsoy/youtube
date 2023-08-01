import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  request: ''
};

const searchSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setRequest(state, action) {
      state.request = action.payload;
    },
    
  }
});

export const {setRequest} = searchSlice.actions;

export default searchSlice.reducer;