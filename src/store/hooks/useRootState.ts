import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

export const useRootState = (): RootState =>
  useSelector<RootState, RootState>(state => state);
