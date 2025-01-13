import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const apiUrl = import.meta.env.VITE_API_URL;

function DataTable({ entries, fetchEntries }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/entries/${selectedId}`);
      setShowConfirm(false);
      fetchEntries();
    } catch (err) {
      console.error("Failed to delete entry:", err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const openConfirmation = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const closeConfirmation = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div className="p-4 sm:p-6">
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
                  {/* Name Column */}
                  <td className="px-4 py-2 break-words">
                    {entry.name}
                  </td>
                  
                  {/* Description Column */}
                  <td className="px-4 py-2 break-words">
                    {entry.description}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-2 text-center space-x-2 flex">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => openConfirmation(entry._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleEdit(entry._id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
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

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={closeConfirmation}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
