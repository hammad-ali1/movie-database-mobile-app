import { useEffect, useRef } from "react";

function useIsInitialRender() {
  const initialRender = useRef(false);

  useEffect(() => {
    initialRender.current = true;
  }, []);
  return initialRender.current;
}

export default useIsInitialRender;
