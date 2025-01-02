import { useState, useCallback } from "react";
import axios from "axios";

export default function useCreate(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createItem = useCallback(
    async (body) => {
      try {
        setLoading(true);
        const response = await axios.post(url, body);
        if (response.status !== 201) {
          throw new Error("Failed to create item");
        }
        setData(response.data.data);
        return true; // Success
      } catch (error) {
        setError(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  const resetError = () => setError(null);

  return { data, error, loading, createItem, resetError };
}
