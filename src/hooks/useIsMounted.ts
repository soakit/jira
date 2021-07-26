import { useEffect, useRef } from "react";

/**
 * 返回组件的挂载状态。
 * 如果还没挂载或者已经卸载，返回false；
 * 反之，返回true
 */
const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export default useIsMounted;
