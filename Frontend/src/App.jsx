import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Header from "./Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faDatabase,
  faCalendarDays,
  faPhone,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import UpdateEntry from "./components/UpdateEntry";
import ContactUs from "./pages/Contactus";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status (e.g., from localStorage or API)
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // If token exists, user is authenticated
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Private Route component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed h-full bg-blue-500 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-[100px] pt-[7rem]  flex flex-col items-center space-y-4`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-white text-2xl"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            <FontAwesomeIcon
              icon={faHouse}
              size="2x"
              className="text-white border rounded-md shadow-lg shadow-slate-600 p-2"
            />
          </Link>
          <Link to="/entry" onClick={() => setIsSidebarOpen(false)}>
            <FontAwesomeIcon
              icon={faDatabase}
              size="2x"
              className="text-white border rounded-md shadow-lg shadow-slate-600 p-2"
            />
          </Link>
          <Link to="/overview" onClick={() => setIsSidebarOpen(false)}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              size="2x"
              className="text-white border rounded-md shadow-lg shadow-slate-600 p-2"
            />
          </Link>
          <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
            <FontAwesomeIcon
              icon={faPhone}
              size="2x"
              className="text-white border rounded-md shadow-lg shadow-slate-600 p-2"
            />
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-0 md:ml-[100px]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between p-4">
            <button
              className="md:hidden text-2xl text-blue-500"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Header />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-gray-100">
            <Routes>
              {/* Redirect root ("/") to login */}
              <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
              <Route
                path="/login"
                element={<Login setAuth={setIsAuthenticated} />}
              />
              <Route path="/signup" element={<Signup />} />
              {/* Private Routes */}
              <Route path="/update/:id" element={<PrivateRoute element={<UpdateEntry />} />} />
              <Route path="/entry" element={<PrivateRoute element={<Page1 />} />} />
              <Route path="/overview" element={<PrivateRoute element={<Page2 />} />} />
              <Route path="/contact" element={<PrivateRoute element={<ContactUs />} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
