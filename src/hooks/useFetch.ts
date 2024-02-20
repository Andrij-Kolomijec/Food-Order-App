import { useEffect, useState } from "react";

type FetchResult<T> = {
  isFetching: boolean;
  fetchedData: T;
  setFetchedData: React.Dispatch<React.SetStateAction<T>>;
  error: object | undefined;
};

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  initialValue: T
): FetchResult<T> {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<object | undefined>();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError({ message: error.message || "Failed to fetch data." });
        }
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
