/** @format */

import { createContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import axios from "axios";
import { app } from "../Firebase/friebase.config";

export const AuthContext = createContext({});
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(true);

  // sing up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update usr name photo
  const updateUserNamePhoto = (dName, pURL) => {
    return updateProfile(auth.currentUser, {
      displayName: dName,
      photoURL: pURL,
    });
  };

  // login
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true); 
    return signOut(auth); 
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userData = { email: currentUser?.email };
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt-token`, userData)
          .then((result) => {
            localStorage.setItem("access-token", result.data.token);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    processing,
    setProcessing,
    createUser,
    updateUserNamePhoto,
    userLogin,
    googleLogin,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
