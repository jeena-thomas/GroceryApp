/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useCallback} from 'react';

/**
 * Custom React Hook for debouncing a function's execution.
 *
 * @param {function} effect - The function to be executed after the debounce delay.
 * @param {Array} dependencies - The dependencies to be used with useCallback.
 * @param {number} delay - The delay (in milliseconds) for debouncing the function.
 */

export default function useDebounce(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
