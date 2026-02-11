// Cambiar a useQuery.router si se necesita compatibilidad con react-router.
// Este hook manipula el estado de búsqueda de react-router y no el URLSearchParams del navegador, por lo que es compatible con react-router pero no con casos simples sin react-router ni sessionStorage.
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
  const storedValue = sessionStorage.getItem(key) ?? defaultValue;
  const [value, setValue] = useState(() => {
    return query.get(key) ?? storedValue;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(globalThis.location.search);
    if (value) {
      searchParams.set(key, value);
      sessionStorage.setItem(key, value);
    } else {
      searchParams.delete(key);
      sessionStorage.removeItem(key);
    }
    globalThis.history.replaceState(
      {},
      "",
      `${globalThis.location.pathname}?${searchParams.toString()}`,
    );
  }, [key, value]);

  return [value, setValue];
};
