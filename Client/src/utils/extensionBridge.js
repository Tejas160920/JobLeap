/**
 * Extension Bridge Utility
 * Handles communication between JobLeap website and Chrome extension
 * Uses window.postMessage to communicate with extension's content script
 */

// Generate unique request IDs for tracking responses
let requestCounter = 0;
const generateRequestId = () => `req_${++requestCounter}_${Date.now()}`;

// Store pending request callbacks
const pendingRequests = new Map();

// Listen for responses from extension
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    // Only accept messages from same origin
    if (event.source !== window) return;

    const message = event.data;
    if (!message || !message.type || !message.type.startsWith('JOBLEAP_')) return;

    // Handle response messages
    if (message.requestId && pendingRequests.has(message.requestId)) {
      const { resolve } = pendingRequests.get(message.requestId);
      pendingRequests.delete(message.requestId);
      resolve(message);
    }
  });
}

/**
 * Send a message to the extension and wait for response
 */
const sendMessage = (type, payload = {}, timeout = 3000) => {
  return new Promise((resolve) => {
    const requestId = generateRequestId();

    // Set up timeout
    const timeoutId = setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
        resolve({ success: false, error: 'Timeout' });
      }
    }, timeout);

    // Store the pending request
    pendingRequests.set(requestId, {
      resolve: (response) => {
        clearTimeout(timeoutId);
        resolve(response);
      }
    });

    // Send message to extension
    window.postMessage({ type, ...payload, requestId }, '*');
  });
};

/**
 * Check if the JobLeap extension is installed
 */
export const isExtensionInstalled = async () => {
  // Check for global variable set by extension
  if (typeof window !== 'undefined' && window.__JOBLEAP_EXTENSION_INSTALLED__) {
    return true;
  }

  // Try to ping the extension
  const response = await sendMessage('JOBLEAP_PING');
  return response?.success || false;
};

/**
 * Get extension version
 */
export const getExtensionVersion = () => {
  if (typeof window !== 'undefined') {
    return window.__JOBLEAP_EXTENSION_VERSION__ || null;
  }
  return null;
};

/**
 * Send auth token to extension for syncing
 */
export const syncTokenWithExtension = async (token) => {
  if (!token) return false;

  const response = await sendMessage('JOBLEAP_SYNC_TOKEN', { token });
  return response?.success || false;
};

/**
 * Sync profile data to extension
 */
export const syncProfileWithExtension = async (profile) => {
  if (!profile) return false;

  const response = await sendMessage('JOBLEAP_SYNC_PROFILE', { profile });
  return response?.success || false;
};

/**
 * Request profile from extension
 */
export const getProfileFromExtension = async () => {
  const response = await sendMessage('JOBLEAP_GET_PROFILE');
  if (response?.success && response.profile) {
    return response.profile;
  }
  return null;
};

/**
 * Check authentication status in extension
 */
export const getExtensionAuthStatus = async () => {
  const response = await sendMessage('JOBLEAP_GET_AUTH_STATUS');
  return response?.authenticated || false;
};

/**
 * Logout from extension (clear stored token and profile)
 */
export const logoutFromExtension = async () => {
  const response = await sendMessage('JOBLEAP_LOGOUT');
  return response?.success || false;
};

/**
 * Wait for extension to be ready (useful on page load)
 */
export const waitForExtension = (timeout = 2000) => {
  return new Promise((resolve) => {
    // If already installed, resolve immediately
    if (typeof window !== 'undefined' && window.__JOBLEAP_EXTENSION_INSTALLED__) {
      resolve(true);
      return;
    }

    // Listen for installation message
    const handler = (event) => {
      if (event.data?.type === 'JOBLEAP_EXTENSION_INSTALLED') {
        window.removeEventListener('message', handler);
        clearTimeout(timeoutId);
        resolve(true);
      }
    };

    window.addEventListener('message', handler);

    // Set timeout
    const timeoutId = setTimeout(() => {
      window.removeEventListener('message', handler);
      resolve(false);
    }, timeout);
  });
};

export default {
  isExtensionInstalled,
  getExtensionVersion,
  syncTokenWithExtension,
  syncProfileWithExtension,
  getProfileFromExtension,
  getExtensionAuthStatus,
  logoutFromExtension,
  waitForExtension,
};
