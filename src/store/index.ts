import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import blocks from 'features/blocks/blocks.state';

const rootReducer = combineReducers({ blocks });

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    enhancers: [],
    devTools: true,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

const wrapper = createWrapper<AppStore>(createStore);

export default wrapper;
