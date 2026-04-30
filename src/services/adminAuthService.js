import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// List of authorized admin emails
const AUTHORIZED_ADMINS = [
  'velfound1@gmail.com',
  'akshath.tumkur@velfound.com',
  'sahil.ranakoti@velfound.com',
  'jayanth.karthik@velfound.com',
  'vikas.reddy@velfound.com',
  'nishanth.konakondu@velfound.com',
  'varshith@velfound.com',
  'gudipati.srinadh@velfound.com',
];

export const adminAuthService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      console.log('Starting Google Sign-In...');
      
      // Set persistence
      await setPersistence(auth, browserLocalPersistence);
      
      console.log('Attempting popup sign-in...');
      const result = await Promise.race([
        signInWithPopup(auth, googleProvider),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Sign-in timeout. Please try again.')), 30000)
        )
      ]);
      
      const user = result.user;
      const email = user.email;

      console.log('User signed in:', email);

      // Check if user is authorized admin
      if (!AUTHORIZED_ADMINS.includes(email)) {
        console.warn('Unauthorized admin attempt:', email);
        // Sign out unauthorized user
        await signOut(auth);
        throw new Error(`Email "${email}" is not authorized. Authorized emails: ${AUTHORIZED_ADMINS.join(', ')}`);
      }

      console.log('User authorized, creating/updating admin document...');

      // Get or create admin user document
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (!adminDocSnap.exists()) {
        console.log('Creating new admin document...');
        // Create new admin document
        await setDoc(adminDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Admin',
          photoURL: user.photoURL,
          role: 'admin',
          accessLevel: 'founder',
          active: true,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        console.log('Updating existing admin document...');
        // Update last login
        await setDoc(
          adminDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      }

      console.log('Admin sign-in successful');
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
