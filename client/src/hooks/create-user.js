import { useState, useCallback } from 'react';
import axios from 'axios';

// Custom Hook
const useCreateUser = () => {
  const [success, setSuccess] = useState(null); // null to indicate no attempt yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = useCallback(async (name) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:3000/user', { name });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Error creating user. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, createUser };
};

export default useCreateUser;