import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

// List of authorized admin emails
const AUTHORIZED_ADMINS = [
  'velfound1@gmail.com',
];

export const adminAuthService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email;

      // Check if user is authorized admin
      if (!AUTHORIZED_ADMINS.includes(email)) {
        // Sign out unauthorized user
        await signOut(auth);
        throw new Error('You are not authorized to access the admin panel. Please contact the administrator.');
      }

      // Get or create admin user document
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (!adminDocSnap.exists()) {
        // Create new admin document
        await setDoc(adminDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Admin',
          photoURL: user.photoURL,
          role: 'admin',
          accessLevel: 'founder', // Default to founder, can be changed
          active: true,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        // Update last login
        await setDoc(
          adminDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      }

      return user;
    } catch (error) {
      console.error('Admin sign in error:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to auth state
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get admin data from Firestore
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminDocSnap = await getDoc(adminDocRef);
          
          if (adminDocSnap.exists()) {
            const adminData = adminDocSnap.data();
            callback({ ...user, ...adminData });
          } else {
            // User not found in admins collection
            await signOut(auth);
            callback(null);
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
          // If Firestore fails, still allow user to proceed
          callback(user);
        }
      } else {
        callback(null);
      }
    });
  },

  // Get admin data from Firestore
  async getAdminData(uid) {
    try {
      const adminDocRef = doc(db, 'admins', uid);
      const adminDocSnap = await getDoc(adminDocRef);
      return adminDocSnap.exists() ? adminDocSnap.data() : null;
    } catch (error) {
      console.error('Error getting admin data:', error);
      throw error;
    }
  },

  // Check if user is authorized admin
  isAuthorizedAdmin(email) {
    return AUTHORIZED_ADMINS.includes(email);
  },

  // Add authorized admin (only for existing admins)
  async addAuthorizedAdmin(email) {
    // This should only be called by existing admins
    if (!AUTHORIZED_ADMINS.includes(email)) {
      AUTHORIZED_ADMINS.push(email);
    }
  },
};
