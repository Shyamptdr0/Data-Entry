import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEntry = ({ fetchEntries }) => {
  const { id } = useParams(); // Extract entry ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [entry, setEntry] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/entries/${id}`);
        setEntry(response.data);
      } catch (err) {
        setError("Failed to fetch entry. Please try again later.");
        console.error("Failed to fetch entry:", err.message);
      }
    };
    fetchEntry();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/entries/${id}`, entry);
      if (fetchEntries) fetchEntries(); // Refresh the entries list
      navigate("/overview"); // Redirect to the desired page after updating
    } catch (err) {
      setError("Failed to update entry. Please check your input and try again.");
      console.error("Failed to update entry:", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Update Entry</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={entry.name}
            onChange={(e) => setEntry({ ...entry, name: e.target.value })}
            placeholder="Name"
            className="w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={entry.description}
            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            placeholder="Description"
            className="w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Entry
          </button>
          <button
            type="button"
            onClick={() => navigate("/page2")}
            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEntry;
