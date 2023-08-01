import {configureStore} from '@reduxjs/toolkit';
import searchResult from '../features/slices/searchSlice';
import videos from '../features/slices/videosSlice';

// import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    searchResult,
    videos,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});