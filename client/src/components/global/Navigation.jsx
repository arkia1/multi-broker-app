import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Multi-Broker App</h1>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <FaSearch size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-6">
            <a href="#dashboard" className="nav-option">
              Dashboard
            </a>
            <a href="#accounts" className="nav-option">
              Accounts
            </a>
            <a href="#brokers" className="nav-option">
              Brokers
            </a>
            <a href="#market-news" className="nav-option">
              Market News
            </a>
            <a href="#settings" className="nav-option">
              Settings
            </a>
            <a href="#help" className="nav-option">
              Help/Support
            </a>
          </div>

          {/* Search Icon for large screens */}
          <div className="hidden lg:block">
            <button className="group hover:text-indigo-600 focus:outline-none">
              <FaSearch
                size={20}
                className="text-white group-hover:text-gray-900 transition-colors duration-300 hover:scale-105"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-indigo-600 p-4 space-y-4">
            <a href="#dashboard" className="block nav-option">
              Dashboard
            </a>
            <a href="#accounts" className="block nav-option">
              Accounts
            </a>
            <a href="#brokers" className="block nav-option">
              Brokers
            </a>
            <a href="#market-news" className="block nav-option">
              Market News
            </a>
            <a href="#settings" className="block nav-option">
              Settings
            </a>
            <a href="#help" className="block nav-option">
              Help/Support
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;