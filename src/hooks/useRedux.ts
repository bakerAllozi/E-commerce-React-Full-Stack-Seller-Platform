import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../APP/store';

export default function useRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const appSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, appSelector };
}
