import toast from 'react-hot-toast';

// Keep track of toast instances to avoid duplicates
const toastTracker = new Set();

// Default success toast style matching the green notification
const successToast = (message) => {
  // Get the stack trace to identify where the toast is being called from
  const stackTrace = new Error().stack;
  const callLocation = stackTrace.split('\n')[2] || 'unknown';
  
  console.log(`SUCCESS TOAST called with message: "${message}" from location:`, callLocation);
  
  // Create a unique key for this toast
  const toastKey = `success-${message}-${Date.now()}`;
  
  // Check if we've shown this exact toast in the last 1 second
  if (toastTracker.has(message)) {
    console.log('Preventing duplicate toast:', message);
    return null;
  }
  
  // Add this toast to our tracker
  toastTracker.add(message);
  
  // Remove it after a short delay
  setTimeout(() => {
    toastTracker.delete(message);
  }, 1000);
  
  return toast.success(message, {
    style: {
      background: '#22c55e',
      color: '#fff',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#22c55e',
    },
    duration: 2000,
    id: toastKey
  });
};

// Default error toast style
const errorToast = (message) => {
  // Get the stack trace to identify where the toast is being called from
  const stackTrace = new Error().stack;
  const callLocation = stackTrace.split('\n')[2] || 'unknown';
  
  console.log(`ERROR TOAST called with message: "${message}" from location:`, callLocation);
  
  // Create a unique key for this toast
  const toastKey = `error-${message}-${Date.now()}`;
  
  // Check if we've shown this exact toast in the last 1 second
  if (toastTracker.has(message)) {
    console.log('Preventing duplicate toast:', message);
    return null;
  }
  
  // Add this toast to our tracker
  toastTracker.add(message);
  
  // Remove it after a short delay
  setTimeout(() => {
    toastTracker.delete(message);
  }, 1000);
  
  return toast.error(message, {
    style: {
      background: '#ef4444',
      color: '#fff',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    duration: 3000,
    id: toastKey
  });
};

export { successToast, errorToast }; 