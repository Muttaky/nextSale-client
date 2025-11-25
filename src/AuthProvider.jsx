"use client";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase.init";
import NavBar from "./app/NavBar";
import Footer from "./app/Footer";

const clearAuthCookie = () => {
  // Sets expiry to 1970, instantly clearing the cookie for all paths.
  document.cookie =
    "is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
let googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  let registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  let loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let loginGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  let logOut = () => {
    setLoading(true);
    clearAuthCookie();
    return signOut(auth);
  };
  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  let authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginGoogle,
    logOut,
  };
  return (
    <AuthContext value={authInfo}>
      {loading ? (
        // Show a simple loading indicator
        <div className="flex justify-center items-center h-screen text-xl font-medium">
          Loading...
        </div>
      ) : (
        // Only render the application content (children) once state is stable
        <>
          <NavBar />
          {children}
          <Footer />
        </>
      )}
    </AuthContext>
  );
};

export default AuthProvider;
