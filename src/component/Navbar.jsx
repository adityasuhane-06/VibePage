import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo1.png'
import { IoIosSearch } from "react-icons/io"
import { HiMenu, HiX } from "react-icons/hi"
import { IoIosNotifications } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { loginStart, loginFailure, loginSuccess, logOut } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nav } from 'motion/react-client'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch();
  const { user, isLoggedIN } = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  const handleLogout = () => {
    dispatch(logOut());
  }
  const accessToken = localStorage.getItem('accessToken');

  const navLinks = [
    { path: '/', label: 'Home' },
    // { path: 'research', label: 'Research' },
    { path: '/write', label: 'Write' },
    { path: '/about', label: 'About' },
    // { path: '/VibeAI', label: 'VibeAI' },
  ]

  return (
    <>
      <nav className='navbar sticky top-0 z-50 bg-white shadow-md rounded-2xl overflow-visible'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            
            {/* Logo */}
            <NavLink to='/' className='flex-shrink-0'>
              <img 
                src={logo} 
                alt="Logo" 
                width={70} 
                height={40} 
                className='hover:opacity-80 transition-opacity duration-200' 
              />
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className='hidden md:flex items-center space-x-8'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
                    }`
                  }
                >
                  {link.label === "VibeAI" ? 
                    <span className='text-sm font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent'>
                      {link.label}
                    </span> : 
                    link.label
                  }
                </NavLink>
              ))}
            </div>

            {/* Search Bar and Actions */}
            <div className='flex items-center space-x-3'>
              {/* Search Bar */}
              <form onSubmit={handleSearch} className='relative hidden md:block'>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder='Search...'
                  className={`bg-gray-100 pl-10 pr-4 py-2 rounded-full placeholder:text-gray-500 
                    border-2 transition-all duration-200 outline-none
                    ${isSearchFocused 
                      ? 'border-indigo-500 bg-white shadow-lg w-64' 
                      : 'border-transparent w-52 hover:bg-gray-200'
                    }`}
                />
                <button
                  type="submit"
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors duration-200'
                  aria-label="Search"
                >
                  <IoIosSearch className='text-xl' />
                </button>
              </form>
              
              {/* Notification Icon - Fixed positioning */}
              <div className='relative flex items-center justify-center w-10 h-10'>
                <button className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'>
                  <IoIosNotifications className='w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors duration-200' />
                  {notificationCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 font-medium'>
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Three Dots Menu - Fixed dropdown positioning */}
              <div className='relative'>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 w-10 h-10 flex items-center justify-center'
                  aria-label="Menu options"
                >
                  <BsThreeDotsVertical className='w-4 h-4 text-gray-700 hover:text-indigo-600 transition-colors duration-200' />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    {!accessToken && (
                      <button
                        className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate('/login');
                        }}
                      >
                        Log In
                      </button>
                    )}
                    {accessToken && (
                      <button
                        className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                      >
                        Log Out
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200'
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX className='h-6 w-6' /> : <HiMenu className='h-6 w-6' />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className='py-2 space-y-1'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label === "VibeAI" ? 
                    <span className='text-sm font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent'>
                      {link.label}
                    </span> : 
                    link.label
                  }
                </NavLink>
              ))}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className='px-3 py-2'>
                <div className='relative'>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search...'
                    className='w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full placeholder:text-gray-500 
                      border-2 border-transparent hover:border-gray-300 focus:border-indigo-500 
                      focus:bg-white outline-none transition-all duration-200'
                  />
                  <button
                    type="submit"
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    aria-label="Search"
                  >
                    <IoIosSearch className='text-xl' />
                  </button>
                </div>
              </form>

             
            </div>
          </div>
        </div>
      </nav>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      
      <Outlet />
    </>
  )
}

export default Navbar