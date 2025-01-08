import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DataEntryForm from '../components/DataEntryForm';
import DataTable from '../components/DataTable';
import UpdateEntry from '../components/UpdateEntry';

const apiUrl = import.meta.env.VITE_API_URL;

const Page1 = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get token
      if (!token) {
        console.error("No authentication token found.");
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }
      const response = await axios.get(`${apiUrl}/entries`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      setEntries(response.data);
    } catch (err) {
      console.error("Failed to fetch entries:", err.message);
      if (err.response && err.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
        localStorage.removeItem("authToken");
        navigate('/login'); // Redirect to login
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEditClick = (entry) => {
    navigate(`/update/${entry._id}`);
  };

  return (
    <div className="p-6">
      {id ? (
        <UpdateEntry fetchEntries={fetchEntries} />
      ) : (
        <>
          <DataEntryForm fetchEntries={fetchEntries} />
          {/* <DataTable entries={entries} fetchEntries={fetchEntries} onEditClick={handleEditClick} /> */}
        </>
      )}
    </div>
  );
};

export default Page1;
