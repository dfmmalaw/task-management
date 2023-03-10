import cookie from "js-cookie";
import { decodeToken } from "react-jwt";

// Set in Cookie
export const setCookie = (key, value) => {
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key) && JSON.parse(cookie.get(key));
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response) => {
  setCookie("token", response.token ? JSON.stringify(response.token) : null);
  setLocalStorage("user", response.user ? JSON.stringify(response.user) : null);
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");

    if (cookieChecked !== null && cookieChecked !== undefined) {
      // varify token
      const decodedToken = decodeToken(cookieChecked);
      const expiresIn = new Date(decodedToken.exp * 1000);
      if (new Date() > expiresIn) {
        removeCookie("token");
        removeLocalStorage("user");
        return false;
      } else if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

export const updateUser = (response, next) => {
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
