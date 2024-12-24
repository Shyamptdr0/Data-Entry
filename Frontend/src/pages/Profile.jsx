import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user info from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user info, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {user ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 font-medium">User ID:</p>
              <p className="text-gray-900">{user.id}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Email:</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Name:</p>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
