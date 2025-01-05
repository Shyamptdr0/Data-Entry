import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useEntries = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${apiUrl}/entries`);
      setEntries(response.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err.message);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, fetchEntries };
};
