import { createContext, useContext, useEffect, useState } from "react";
import * as Auth from "@aws-amplify/auth";
import { getCurrentUser } from 'aws-amplify/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user)
  }, [user])


  // Check if user is already signed in when app loads
  useEffect(() => {
    Auth.getCurrentUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (username, password, email, phoneNumber) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: phoneNumber, // E.164 number convention
        },
        autoSignIn: { enabled: true }, // Automatically sign in the user after confirmation
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const userData = await Auth.signIn(username, password);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await Auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Authentication
export const useAuth = () => useContext(AuthContext);
