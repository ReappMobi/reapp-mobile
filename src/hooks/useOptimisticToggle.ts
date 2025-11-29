import { debounce } from 'es-toolkit/function';
import { useEffect, useRef, useState } from 'react';

type ToggleFunctions = {
  on: () => void;
  off: () => void;
};

export function useOptimisticToggle(
  initialState: boolean,
  toggleFunctions: ToggleFunctions,
  debounceMs = 500
) {
  const [isActive, setIsActive] = useState<boolean>(initialState);
  const isInitialMount = useRef(true);

  const debouncedToggle = useRef(
    debounce((active: boolean) => {
      if (active) {
        toggleFunctions.on();
      } else {
        toggleFunctions.off();
      }
    }, debounceMs)
  ).current;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    debouncedToggle(isActive);
  }, [isActive, debouncedToggle]);

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  return { isActive, toggle };
}
