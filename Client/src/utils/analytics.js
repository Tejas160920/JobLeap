import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-9JRPNF706D';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const trackEvent = (category, action, label = null, value = null) => {
  const eventParams = {
    category,
    action,
    ...(label && { label }),
    ...(value && { value }),
  };
  ReactGA.event(eventParams);
};

// Pre-defined event trackers for common actions
export const analytics = {
  // Job events
  jobSearch: (query) => trackEvent('Jobs', 'Search', query),
  jobView: (jobId) => trackEvent('Jobs', 'View', jobId),
  jobApply: (jobId) => trackEvent('Jobs', 'Apply', jobId),
  jobBookmark: (jobId) => trackEvent('Jobs', 'Bookmark', jobId),

  // Auth events
  login: (method = 'email') => trackEvent('Auth', 'Login', method),
  signup: (method = 'email') => trackEvent('Auth', 'Signup', method),
  logout: () => trackEvent('Auth', 'Logout'),

  // Tool usage events
  resumeBuilderUsed: () => trackEvent('Tools', 'Resume_Builder_Used'),
  atsOptimizerUsed: () => trackEvent('Tools', 'ATS_Optimizer_Used'),
  coverLetterGenerated: () => trackEvent('Tools', 'Cover_Letter_Generated'),
  h1bSearchUsed: () => trackEvent('Tools', 'H1B_Search_Used'),
  autofillProfileUsed: () => trackEvent('Tools', 'Autofill_Profile_Used'),

  // Profile events
  profileCompleted: () => trackEvent('Profile', 'Completed'),
  profileUpdated: () => trackEvent('Profile', 'Updated'),

  // Job alerts
  jobAlertCreated: () => trackEvent('Alerts', 'Created'),
  jobAlertDeleted: () => trackEvent('Alerts', 'Deleted'),
};
