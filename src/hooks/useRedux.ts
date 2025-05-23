import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export default function useRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const appSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, appSelector };
}
