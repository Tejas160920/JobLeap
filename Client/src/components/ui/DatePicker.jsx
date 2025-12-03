import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  error,
  minDate,
  maxDate,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef(null);

  const selectedDate = value ? new Date(value) : null;

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

  // Set current month to selected date's month
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [value]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateForValue = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;
    onChange(formatDateForValue(date));
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleClear = () => {
    onChange('');
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
        <input
          type="text"
          value={selectedDate ? formatDate(selectedDate) : ''}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <FaTimes className="text-sm" />
          </button>
        )}
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <span className="font-semibold text-gray-800">{monthYear}</span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <button
                key={index}
                type="button"
                onClick={() => date && handleDateSelect(date)}
                disabled={isDateDisabled(date)}
                className={`
                  p-2 text-sm rounded-lg transition-colors
                  ${!date ? 'invisible' : ''}
                  ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50'}
                  ${isSelected(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                  ${isToday(date) && !isSelected(date) ? 'border border-blue-500 text-blue-600' : ''}
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={() => handleDateSelect(new Date())}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;
