import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const data = userDoc.data() || {};
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          profile: {
            name: data.name || '',
            age: data.age || null,
            weight: data.weight || null,
            height: data.height || null,
            gender: data.gender || 'male',
            activePlan: data.activePlan || null,
            activePlanName: data.activePlanName || null,
          },
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Błąd logowania');
    }
  };

  const register = async (email, password, profileData) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', res.user.uid), {
        ...profileData,
        activePlan: null,
        activePlanName: null,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new Error('Błąd rejestracji');
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};