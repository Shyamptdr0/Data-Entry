import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Header from "./Header/Header";
import {
  faHouse,
  faDatabase,
  faCalendarDays,
  faPhone,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateEntry from "./components/UpdateEntry";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/verify-token`, { token })
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("authToken");
        });
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redirect to login
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const Layout = ({ children }) => {
    const location = useLocation(); // Call useLocation inside Router context

    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed h-full bg-blue-500 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-[100px] pt-[7rem] flex flex-col items-center space-y-4`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-white text-2xl"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {isAuthenticated && (
            <>
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
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-0 md:ml-[100px]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between p-4">
            {location.pathname !== "/login" && (
              <button
                className="md:hidden text-2xl text-blue-500"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
            <Header />
          </div>
          {/* Children Content */}
          <div className="flex-1 overflow-y-auto bg-gray-100">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {isAuthenticated ? <Home /> : <Navigate to="/login" />}
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              {!isAuthenticated ? (
                <Login setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )}
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/update/:id"
          element={
            <Layout>
              <PrivateRoute>
                <UpdateEntry />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/entry"
          element={
            <Layout>
              <PrivateRoute>
                <Page1 />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/overview"
          element={
            <Layout>
              <PrivateRoute>
                <Page2 />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <PrivateRoute>
                <ContactUs />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
