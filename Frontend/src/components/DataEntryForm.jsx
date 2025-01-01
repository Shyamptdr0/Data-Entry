import React, { useState } from "react";
import axios from "axios";

function DataEntryForm({ fetchEntries }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = formData;

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      await axios.post('/api/entries', { name, description });
      setFormData({ name: "", description: "" }); // Reset form after successful submission
      if (fetchEntries) fetchEntries(); // Refresh data if fetchEntries is provided
    } catch (err) {
      setError("Failed to submit entry. Please try again.");
      console.error("Error submitting form:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {/* Company Description */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Capital Q Tech Services</h1>
        <p className="text-gray-600 leading-relaxed">
          At <strong>Capital Q Tech Services</strong>, we specialize in providing reliable and efficient 
          <strong> data entry solutions</strong> to businesses of all sizes. Our team is dedicated to 
          ensuring accuracy, confidentiality, and timely delivery of your data management tasks.
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          Whether you need help with digitizing documents, organizing spreadsheets, or managing databases, 
          we’re here to streamline your workflow and help your business grow. With years of experience and 
          cutting-edge tools, our services guarantee quality and satisfaction.
        </p>
      </section>

      {/* Form Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Entry</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description (optional)"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default DataEntryForm;
