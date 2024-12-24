import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DataTable({ entries, fetchEntries }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/entries/${id}`);
        fetchEntries(); // Refresh entries after deletion
      } catch (err) {
        console.error("Failed to delete entry:", err.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page with the entry ID
  };

  return (
    <div className="p-6">
      {/* Facts Section */}
      <section className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Data Overview</h2>
      </section>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-t hover:bg-gray-100 transition duration-300"
                >
                  <td className="px-4 py-2">{entry.name}</td>
                  {/* Scrollable description column */}
                  <td className="px-4 py-2 max-h-15 overflow-y-auto">
                    {entry.description}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(entry._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleEdit(entry._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
