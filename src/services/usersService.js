import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc,
  onSnapshot 
} from 'firebase/firestore';

export const usersService = {
  // Add a new user
  async addUser(user) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Update a user
  async updateUser(id, data) {
    try {
      await updateDoc(doc(db, 'users', id), {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user
  async deleteUser(id) {
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get all users
  async getUsers() {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Real-time listener for users
  onUsersChange(callback) {
    return onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(users);
    });
  },
};
