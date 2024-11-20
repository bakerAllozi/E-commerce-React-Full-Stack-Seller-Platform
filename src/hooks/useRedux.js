import { useDispatch, useSelector } from "react-redux";

export default function useRedux() {
  const dispatch = useDispatch();
  const appSelector = useSelector;
  return { dispatch, appSelector };
}
