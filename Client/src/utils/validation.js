// Form validation utilities

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (supports various formats)
export const isValidPhone = (phone) => {
  // Remove all non-digit characters for validation
  const digits = phone.replace(/\D/g, '');
  // Valid if 10-15 digits (international support)
  return digits.length >= 10 && digits.length <= 15;
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return {
    isValid: minLength && hasUppercase && hasLowercase && hasNumber,
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber
  };
};

// URL validation
export const isValidUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

// LinkedIn URL validation
export const isValidLinkedIn = (url) => {
  if (!url) return true;
  return url.includes('linkedin.com');
};

// GitHub URL validation
export const isValidGitHub = (url) => {
  if (!url) return true;
  return url.includes('github.com');
};

// Name validation (no numbers, at least 2 characters)
export const isValidName = (name) => {
  return name.trim().length >= 2 && !/\d/.test(name);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value, min) => {
  return value.trim().length >= min;
};

// Max length validation
export const maxLength = (value, max) => {
  return value.trim().length <= max;
};

// Salary validation (accepts ranges like "$50,000 - $80,000")
export const isValidSalary = (salary) => {
  if (!salary) return true; // Optional
  // Allow numbers, $, commas, k/K, spaces, and hyphens for ranges
  return /^[\d\s,$kK\-\.]+$/.test(salary);
};

// Validate form fields and return errors object
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(value, formData);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });

  return errors;
};

// Pre-built validation rules
export const rules = {
  required: (message = 'This field is required') => (value) => {
    if (!isRequired(value)) return message;
    return null;
  },

  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !isValidEmail(value)) return message;
    return null;
  },

  phone: (message = 'Please enter a valid phone number') => (value) => {
    if (value && !isValidPhone(value)) return message;
    return null;
  },

  password: (message = 'Password must be at least 8 characters with uppercase, lowercase, and number') => (value) => {
    if (value && !isValidPassword(value).isValid) return message;
    return null;
  },

  minLength: (min, message) => (value) => {
    if (value && value.trim().length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max, message) => (value) => {
    if (value && value.trim().length > max) {
      return message || `Must be no more than ${max} characters`;
    }
    return null;
  },

  url: (message = 'Please enter a valid URL') => (value) => {
    if (value && !isValidUrl(value)) return message;
    return null;
  },

  linkedIn: (message = 'Please enter a valid LinkedIn URL') => (value) => {
    if (value && !isValidLinkedIn(value)) return message;
    return null;
  },

  gitHub: (message = 'Please enter a valid GitHub URL') => (value) => {
    if (value && !isValidGitHub(value)) return message;
    return null;
  },

  name: (message = 'Please enter a valid name') => (value) => {
    if (value && !isValidName(value)) return message;
    return null;
  },

  match: (field, message) => (value, formData) => {
    if (value !== formData[field]) {
      return message || 'Fields do not match';
    }
    return null;
  }
};

// Indian cities list for location dropdown
export const indianCities = [
  'Mumbai, Maharashtra',
  'Delhi, NCR',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh',
  'Nagpur, Maharashtra',
  'Indore, Madhya Pradesh',
  'Thane, Maharashtra',
  'Bhopal, Madhya Pradesh',
  'Visakhapatnam, Andhra Pradesh',
  'Patna, Bihar',
  'Vadodara, Gujarat',
  'Ghaziabad, Uttar Pradesh',
  'Ludhiana, Punjab',
  'Agra, Uttar Pradesh',
  'Nashik, Maharashtra',
  'Faridabad, Haryana',
  'Meerut, Uttar Pradesh',
  'Rajkot, Gujarat',
  'Varanasi, Uttar Pradesh',
  'Srinagar, Jammu & Kashmir',
  'Aurangabad, Maharashtra',
  'Dhanbad, Jharkhand',
  'Amritsar, Punjab',
  'Navi Mumbai, Maharashtra',
  'Allahabad, Uttar Pradesh',
  'Ranchi, Jharkhand',
  'Howrah, West Bengal',
  'Coimbatore, Tamil Nadu',
  'Jabalpur, Madhya Pradesh',
  'Gwalior, Madhya Pradesh',
  'Vijayawada, Andhra Pradesh',
  'Jodhpur, Rajasthan',
  'Madurai, Tamil Nadu',
  'Raipur, Chhattisgarh',
  'Kota, Rajasthan',
  'Chandigarh',
  'Guwahati, Assam',
  'Solapur, Maharashtra',
  'Noida, Uttar Pradesh',
  'Gurugram, Haryana',
  'Remote',
  'Work from Home',
  'Hybrid'
];

// US cities for international jobs
export const usCities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'San Francisco, CA',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Remote',
  'Work from Home',
  'Hybrid'
];

// Combined locations
export const allLocations = [...new Set([...indianCities, ...usCities])].sort();
