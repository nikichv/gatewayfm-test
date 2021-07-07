import { EntityState } from '@reduxjs/toolkit';
import { blockSelectors } from 'features/blocks/blocks.state';
import {
  getBlockByIdThunk,
  getLatestBlockThunk,
} from 'features/blocks/blocks.thunks';
import { Block, BlockId } from 'features/blocks/blocks.types';
import { AsyncEntity } from 'global';
import { useCallback, useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { RootState } from 'store/index';
import entityAsPending from 'store/utils/entityAsPending';

// Infer return type from usage
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBlockById = (id: BlockId | 'latest') => {
  const dispatch = useAppDispatch();

  const blocks = useSelector<RootState, EntityState<AsyncEntity<Block>>>(
    state => state.blocks
  );

  const block = blockSelectors.selectById(blocks, id) || entityAsPending(id);

  const fetchBlock = useCallback(
    () =>
      dispatch(
        id === 'latest'
          ? getLatestBlockThunk()
          : getBlockByIdThunk({ params: { id } })
      ),
    [dispatch, id]
  );

  useDebugValue(block);

  return { block, fetchBlock };
};
