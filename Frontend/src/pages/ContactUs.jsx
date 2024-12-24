import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent. We'll get back to you shortly!");
    setFormData({ name: "", email: "", message: "" }); // Clear form after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        We’re here to assist you! Fill out the form below or reach out to us via
        email or phone, and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Details */}
      <div className="mt-12 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p>Email: <a href="mailto:info@capitalqtech.com" className="text-blue-600 underline">info@capitalqtech.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 234-567-890</a></p>
        <p>Address: 123 Tech Park, City, State, ZIP</p>
      </div>
    </div>
  );
};

export default ContactUs;
