import { createContext, useContext, useEffect, useState } from "react";
import * as Auth from "@aws-amplify/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const getUser = () => {
    Auth.getCurrentUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
  };


  // Check if user is already signed in when app loads
  useEffect(() => {
    getUser();
  }, []);

  const confirmSignUp = async ({ username, confirmationCode }) => {
    try {
      await Auth.confirmSignUp({
        username,
        confirmationCode,
      });
      console.log("User confirmed successfully");
      await Auth.autoSignIn();
      getUser();
    } catch (error) {
      console.error("Confirmation failed", error);
      throw error;
    }
  };

  const signUp = async ({ username, password, email }) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: {
            enabled: true,
          },
        },
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    }
  };

  const login = async ({ username, password }) => {
    try {
      console.log(username, password)
      const userData = await Auth.signIn({ username, password });
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
    <AuthContext.Provider value={{ user, signUp, login, logout, confirmSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Authentication
export const useAuth = () => useContext(AuthContext);
