// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase"; // Make sure firebase is initialized correctly
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("User state changed:", user); // Debugging line
      if (user) {
        setCurrentUser(user);
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Assign default role as 'user'
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Default role
        username: user.email.split("@")[0], // Use part of email as username
      });

      return user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // This allows you to handle the error in your signup component
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // This allows you to handle the error in your login component
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Handle logout error if necessary
    }
  };

  const getUserRole = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ currentUser, userRole, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
  