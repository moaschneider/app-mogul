import toast from 'react-hot-toast';

// Default success toast style matching the green notification
const successToast = (message) => {
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
  });
};

// Default error toast style
const errorToast = (message) => {
  return toast.error(message, {
    style: {
      background: '#ef4444',
      color: '#fff',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    duration: 3000,
  });
};

export { successToast, errorToast }; 