import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaChevronDown, FaTimes } from 'react-icons/fa';
import { indianCities } from '../../utils/validation';

const LocationDropdown = ({
  value,
  onChange,
  placeholder = 'Select location',
  error,
  required = false,
  allowCustom = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianCities);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter cities based on search
  useEffect(() => {
    const filtered = indianCities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm]);

  const handleSelect = (city) => {
    onChange(city);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (allowCustom) {
      onChange(newValue);
    }
    if (!isOpen) setIsOpen(true);
  };

  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
        <input
          ref={inputRef}
          type="text"
          value={value || searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
          <FaChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(city)}
                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                  value === city ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                  <span>{city}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              {allowCustom ? (
                <span>No matches found. Press Enter to use "{searchTerm}"</span>
              ) : (
                <span>No locations found</span>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LocationDropdown;
