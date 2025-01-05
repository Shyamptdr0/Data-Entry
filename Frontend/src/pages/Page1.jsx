import React from 'react';
import { useParams } from 'react-router-dom';
import { useEntries } from '../pages/useEntries';
import DataEntryForm from "../components/DataEntryForm";
import UpdateEntry from "../components/UpdateEntry";

const Page1 = () => {
  const { entries, fetchEntries } = useEntries(); // Custom hook
  const { id } = useParams(); // Check if an entry is being updated

  return (
    <div className="p-6">
      {id ? (
        <UpdateEntry fetchEntries={fetchEntries} entryId={id} />
      ) : (
        <DataEntryForm fetchEntries={fetchEntries} />
      )}
    </div>
  );
};

export default Page1;
