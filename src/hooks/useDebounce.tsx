import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
  // estado del debounce
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // actualizo el estado cuando cambia el valor
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // limpio el timeout
      return () => {                    
        clearTimeout(handler);
      };
    },
    [value, delay] // se ejecuta cuando el valor o el delay cambian
  );
  // devuelvo el estado debouncedValue
  return debouncedValue;
}