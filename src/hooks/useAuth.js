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
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(endPoints.auth.login, options);
      const data = await response.json();
      Cookie.set('token', data.access_token, { expires: 5 });
      if (response.ok) {
        const options = {
          method: 'GET',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${Cookie.get('token')}`,
          },
        };
        const response = await fetch(endPoints.auth.profile, options);
        const data = await response.json();
        const json = JSON.stringify({ ...data, avatar: 'https://cdna.artstation.com/p/assets/images/images/046/235/272/smaller_square/pixel-arts-de-un-nino-random-ranita-uwu.jpg?1644605499' });
        Cookie.set('user-token', json);
        setUser({ ...data, avatar: 'https://cdna.artstation.com/p/assets/images/images/046/235/272/smaller_square/pixel-arts-de-un-nino-random-ranita-uwu.jpg?1644605499' });
        return data;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    Cookie.remove('token');
    Cookie.remove('user-token');
    const headers = new Headers();
    headers.delete('Authorization');
    window.location.href = '/login';
  };

  const loginValidation = async () => {
    const token = Cookie.get('token');
    if (token) {
      const options = {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${Cookie.get('token')}`,
        },
      };
      const response = await fetch(endPoints.auth.profile, options);
      const data = await response.json();
      setUser(data);
    } else {
      setUser(null);
      return 'unauthorized';
    }
  };

  return {
    user,
    signIn,
    logout,
    loginValidation
  };
}
