import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEntries } from '../pages/useEntries';
import DataTable from "../components/DataTable";
import UpdateEntry from "../components/UpdateEntry";

const Page2 = () => {
  const { entries, fetchEntries } = useEntries(); // Custom hook
  const navigate = useNavigate();
  const { id } = useParams(); // Check if an entry is being updated

  const handleEditClick = (entry) => {
    navigate(`/update/${entry._id}`);
  };

  return (
    <div className="p-6">
      {id ? (
        <UpdateEntry fetchEntries={fetchEntries} entryId={id} />
      ) : (
        <DataTable
          entries={entries}
          fetchEntries={fetchEntries}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default Page2;
