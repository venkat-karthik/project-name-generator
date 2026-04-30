import { createContext, useContext, useEffect, useState } from 'react';
import { adminAuthService } from '../services/adminAuthService';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = adminAuthService.onAuthStateChanged((user) => {
        setAdminUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      console.error('Auth error:', err);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const user = await adminAuthService.signInWithGoogle();
      setAdminUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await adminAuthService.signOut();
      setAdminUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    adminUser,
    loading,
    error,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!adminUser,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
