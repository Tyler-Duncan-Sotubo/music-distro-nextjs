"use client";

import { useState, useEffect } from "react";
import axios from "@/libs/axios";
import { useSession } from "next-auth/react";

interface UseFetchData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>; // Expose fetch function for manual triggers
}

const useFetchApiData = <T>(baseURL: string): UseFetchData<T> => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${baseURL}/${userId}`);
      setData(res.data as T[]);
    } catch (err) {
      setError("No Report Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData(); // Fetch data when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL, userId]); // Refetch if the baseURL or userId changes

  return { data, loading, error, fetchData }; // Expose the data, loading, error, and fetch function
};

export default useFetchApiData;
