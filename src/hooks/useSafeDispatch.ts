import { useCallback } from "react";
import useIsMouted from "./useIsMounted";

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useIsMouted();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export default useSafeDispatch;
