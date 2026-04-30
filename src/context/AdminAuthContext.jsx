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
      console.log('Context: Initiating Google Sign-In');
      const user = await adminAuthService.signInWithGoogle();
      console.log('Context: Sign-in successful');
      setAdminUser(user);
      return user;
    } catch (err) {
      console.error('Context: Sign-in error:', err);
      const errorMessage = err.message || 'Failed to sign in. Please try again.';
      setError(errorMessage);
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
