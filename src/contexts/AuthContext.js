import React, { createContext, useContext, useState, useEffect} from 'react';
import {getAccressToken, removeAllTokens, setAccessToken, setRefreshToken} from '../storage/Cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAccressToken() || false;
    if (token) { 
      setLoggedIn(true);
    }
  }, []);

  const login = (tokens) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setLoggedIn(true);
  }

  const getLoggedIn = () => {
    const token = getAccressToken() || false;
    return token ? true : false;
  }

  const logout = () => {
    removeAllTokens();
    const token = getAccressToken() || false;
    setLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
