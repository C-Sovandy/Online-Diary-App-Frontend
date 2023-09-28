import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 7 }); // Expires in 7 days (adjust as needed)
};

// Get a cookie
export const getCookie = (key) => {
  return Cookies.get(key);
};

// Remove a cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};


