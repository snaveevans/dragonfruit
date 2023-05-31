import { useEffect, useRef, useState } from "react";

export default function useDebounce<TValue>(
  value: TValue,
  ms = 250
): TValue | undefined {
  const [state, setState] = useState<TValue>();
  const timeoutId = useRef<number>();

  useEffect(() => {
    const clearTimeout = () => {
      if (!timeoutId.current) {
        return;
      }
      window.clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    };
    clearTimeout();
    setTimeout(() => {
      window.setTimeout(() => {
        setState(value);
      }, ms);
    });

    return clearTimeout;
  }, [value, ms]);

  return state;
}
