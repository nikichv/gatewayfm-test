import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  getBlockByIdThunk,
  getLatestBlockThunk,
} from 'features/blocks/blocks.thunks';
import { Block } from 'features/blocks/blocks.types';
import { AsyncEntity } from 'global';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'store/index';
import entityAsFulfilled from 'store/utils/entityAsFulfilled';
import entityAsPending from 'store/utils/entityAsPending';
import entityAsRejected from 'store/utils/entityAsRejected';

const blocksAdapter = createEntityAdapter<AsyncEntity<Block>>();

export const blockSelectors = blocksAdapter.getSelectors();

const slice = createSlice({
  name: 'blocks',
  initialState: blocksAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(HYDRATE, (state, action) => {
        // Hydrating state from server to add new items from SSR
        const { ids, entities } = (action as PayloadAction<RootState>).payload
          .blocks;
        blocksAdapter.upsertMany(
          state,
          blockSelectors.selectAll({ entities, ids })
        );
      })
      .addCase(getLatestBlockThunk.pending, state => {
        blocksAdapter.upsertOne(state, entityAsPending('latest'));
      })
      .addCase(getLatestBlockThunk.rejected, (state, { payload }) => {
        blocksAdapter.updateOne(state, {
          id: 'latest',
          changes: entityAsRejected('latest', payload),
        });
      })
      .addCase(getLatestBlockThunk.fulfilled, (state, { payload }) => {
        blocksAdapter.updateOne(state, {
          id: 'latest',
          changes: entityAsFulfilled('latest', payload.result),
        });
      })
      .addCase(getBlockByIdThunk.pending, (state, { meta }) => {
        const { id } = meta.arg.params;
        blocksAdapter.upsertOne(state, entityAsPending(id));
      })
      .addCase(getBlockByIdThunk.rejected, (state, { payload, meta }) => {
        const { id } = meta.arg.params;
        blocksAdapter.updateOne(state, {
          id,
          changes: entityAsRejected(id, payload),
        });
      })
      .addCase(getBlockByIdThunk.fulfilled, (state, { payload }) => {
        const { id, result = null } = payload;
        blocksAdapter.updateOne(state, {
          id,
          changes: entityAsFulfilled(id, result),
        });
      }),
});

const { reducer } = slice;

export default reducer;
