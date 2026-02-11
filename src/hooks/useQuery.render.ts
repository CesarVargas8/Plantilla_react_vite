// Para casos simples, sin react-router ni sessionStorage, se puede usar este hook que manipula directamente el URLSearchParams del navegador.
// Es importante notar que este hook no es compatible con react-router, ya que react-router maneja su propio estado de búsqueda y no actualiza el URLSearchParams del navegador de la misma manera.
import { useEffect, useState } from "react";

export const useURLQuery = (): URLSearchParams => {
  return new URLSearchParams(globalThis.location.search);
};

export const useQueryValue = ({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue?: string;
}): [string | undefined, (newValue?: string) => void] => {
  const query = useURLQuery();
  const [value, setValue] = useState(() => {
    return query.get(key) ?? defaultValue;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(globalThis.location.search);
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    globalThis.history.replaceState(
      {},
      "",
      `${globalThis.location.pathname}?${searchParams.toString()}`,
    );
  }, [key, value]);

  return [value, setValue];
};
