import { useCallback, useState } from "react";

import { api } from "../api";
import { IError } from "../api/interfaces/IError";
import { IPayload } from "../api/interfaces/IPayload";

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<IError | null>();
  const [fetching, setFetching] = useState<boolean>();

  const executeGet = useCallback(async (url: string, params?: object) => {
    setError(null);
    setFetching(true);

    try {
      const { data: response } = await api.get<IPayload<T>>(url, { params });

      if (!response.success) {
        throw response.message;
      }

      setData(response.payload);
    } catch (err) {
      setError({ message: (err as Error).message } as IError);
    } finally {
      setFetching(false);
    }
  }, []);

  const executePost = useCallback(async (url: string, params?: object) => {
    setError(null);
    setFetching(false);

    try {
      const { data: response } = await api.post<IPayload<T>>(url, { params });

      if (!response.success) {
        throw response.message;
      }

      setData(response.payload);
    } catch (err) {
      setError({ message: (err as Error).message } as IError);
    } finally {
      setFetching(false);
    }
  }, []);

  return { data, error, fetching, executeGet, executePost };
}
