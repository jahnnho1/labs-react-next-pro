import React, { useState, useContext, createContext } from 'react';
//import AppContext from '../context/AppContext';
import Cookie from 'js-cookie';
import endPoints from '@services/api/';

const AuthContext = createContext({});

export function ProviderAuth({ children }) {
  const Auth = useProvideAuth();
  return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const response = await fetch(endPoints.auth.login, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    Cookie.set('token', data.access_token);
    return data;
  };

  const getUser = async () => {
    const response = await fetch(endPoints.auth.profile, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookie.get('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        return data;
      });
    return response;
  };

  const signOut = () => {
    return new Promise((resolve) => {
      setUser(false);
      Cookie.remove('token');
      resolve();
    });
  };

  return {
    user,
    signIn,
    getUser,
    signOut,
  };
}
