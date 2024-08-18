import { useState, useCallback } from 'react';
import axios from 'axios';

// Custom Hook
const useCheckInUser = () => {
  const [success, setSuccess] = useState(null); // null to indicate no attempt yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkInUser = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.put(`http://localhost:3000/user/${id}`);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Error creating user. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, checkInUser };
};

export default useCheckInUser;