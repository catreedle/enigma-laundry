import { useState, useCallback } from "react";
import axios from "axios";

export default function useUpdate(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateItem = useCallback(
    async (body) => {
      try {
        setLoading(true);
        const response = await axios.put(url, body);
        if (response.status !== 200) {
          throw new Error("Failed to update item");
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

  return { data, error, loading, updateItem, resetError };
}
