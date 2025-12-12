/**
 * Extension Bridge Utility
 * Handles communication between JobLeap website and Chrome extension
 */

// Extension ID - you'll need to update this with your actual extension ID from Chrome
const EXTENSION_ID = 'YOUR_EXTENSION_ID_HERE'; // Update after publishing extension

/**
 * Check if the JobLeap extension is installed
 */
export const isExtensionInstalled = async () => {
  return new Promise((resolve) => {
    // Try to send a message to the extension
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      try {
        chrome.runtime.sendMessage(EXTENSION_ID, { type: 'PING' }, (response) => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(response?.success || false);
          }
        });
      } catch {
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
};

/**
 * Send auth token to extension for syncing
 */
export const syncTokenWithExtension = async (token) => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(EXTENSION_ID, { type: 'LOGIN', payload: { token } }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Extension not available:', chrome.runtime.lastError.message);
            resolve(false);
          } else {
            resolve(response?.success || false);
          }
        });
      } catch (error) {
        console.warn('Failed to sync token with extension:', error);
        resolve(false);
      }
    });
  }
  return false;
};

/**
 * Sync profile data to extension
 */
export const syncProfileWithExtension = async (profile) => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(EXTENSION_ID, { type: 'SAVE_PROFILE', payload: profile }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Extension not available:', chrome.runtime.lastError.message);
            resolve(false);
          } else {
            resolve(response?.success || false);
          }
        });
      } catch (error) {
        console.warn('Failed to sync profile with extension:', error);
        resolve(false);
      }
    });
  }
  return false;
};

/**
 * Request profile from extension
 */
export const getProfileFromExtension = async () => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GET_PROFILE' }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Extension not available:', chrome.runtime.lastError.message);
            resolve(null);
          } else if (response?.success && response.data) {
            resolve(response.data);
          } else {
            resolve(null);
          }
        });
      } catch (error) {
        console.warn('Failed to get profile from extension:', error);
        resolve(null);
      }
    });
  }
  return null;
};

/**
 * Open the extension side panel (if supported)
 */
export const openExtensionSidePanel = () => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: 'OPEN_SIDEPANEL' });
    } catch {
      console.warn('Failed to open extension side panel');
    }
  }
};

export default {
  isExtensionInstalled,
  syncTokenWithExtension,
  syncProfileWithExtension,
  getProfileFromExtension,
  openExtensionSidePanel,
};
