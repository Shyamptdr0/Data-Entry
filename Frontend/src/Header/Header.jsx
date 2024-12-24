import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <div className=' pt-0  bg-gray-200 border-r-4 flex justify-between items-center relative'>
        <h1 className='pl-2 font-bold text-black'>Capital Q Tech Services</h1>
        <img src="/Capital Q Tech Services   3logo.jpg" alt="" className='w-[100px] h-[70px] pt-2 pr-10' />
        <div className='relative'>
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2x"
            className='text-black cursor-pointer pr-10'
            onClick={toggleDropdown}
          /> 
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
              <ul className='py-1'>
                <li>
                  {/* <button 
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                    onClick={goToProfile}
                  >
                    Profile Settings
                  </button> */}
                </li>
                <li>
                  <button 
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
