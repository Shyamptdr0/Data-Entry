import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DataEntryForm from "../components/DataEntryForm";
import DataTable from "../components/DataTable";
import UpdateEntry from "../components/UpdateEntry";

const Page1 = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/entries');
      setEntries(response.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err.message);
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
  <UpdateEntry
    fetchEntries={fetchEntries} // Ensure this is passed
  />
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
