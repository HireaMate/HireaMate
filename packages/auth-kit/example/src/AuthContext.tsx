
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signInInfo, setSignInInfo] = useState(null);

  const updateSignInInfo = (newSignInInfo) => {
    setSignInInfo(newSignInInfo);
  };

  return (
    <AuthContext.Provider value={{ signInInfo, updateSignInInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


  