import { useState } from "react";
import axios from "axios";

const useDelete = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null); // Reset error before starting
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      if (response.status !== 204) {
        throw new Error("Failed to delete item");
      }
      return true; // Success
    } catch (err) {
      setError(err.message); // Store the error
      return false; // Failure
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => setError(null); // Clear error manually

  return { loading, error, deleteItem, resetError };
};

export default useDelete;
