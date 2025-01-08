import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons

const apiUrl = import.meta.env.VITE_API_URL;

function DataTable({ entries, fetchEntries }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`${apiUrl}/entries/${id}`);
        fetchEntries();
      } catch (err) {
        console.error("Failed to delete entry:", err.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="p-4 sm:p-6"> {/* Reduced padding for mobile view */}
      {/* Facts Section */}
      <section className="mb-4 sm:mb-6 bg-blue-100 p-3 sm:p-4 rounded-lg shadow-md"> {/* Adjusted padding */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">Data Overview</h2> {/* Reduced font size for mobile */}
      </section>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-2 sm:px-4 py-2 text-left">Name</th> {/* Reduced padding */}
              <th className="px-2 sm:px-4 py-2 text-left">Description</th> {/* Reduced padding */}
              <th className="px-2 sm:px-4 py-2 text-center">Actions</th> {/* Reduced padding */}
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-t hover:bg-gray-100 transition duration-300"
                >
                  {/* Name Column */}
                  <td className="px-2 sm:px-4 py-2 max-w-xs truncate overflow-hidden">{entry.name}</td> {/* Text Truncation */}
                  
                  {/* Description Column with Truncation and Scroll */}
                  <td className="px-2 sm:px-4 py-2 max-w-xs overflow-hidden overflow-ellipsis text-ellipsis">{entry.description}</td> {/* Text Truncation */}

                  {/* Action Buttons */}
                  <td className="px-2 sm:px-4 py-2 text-center space-x-2">
                    <button
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(entry._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleEdit(entry._id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> {/* Edit Icon */}
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
