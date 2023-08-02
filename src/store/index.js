import {configureStore} from '@reduxjs/toolkit';
import searchResult from '../features/slices/searchSlice';
import videos from '../features/slices/videosSlice';

export const store = configureStore({
  reducer: {
    searchResult,
    videos,
  },
});