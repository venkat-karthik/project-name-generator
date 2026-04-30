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

export const blogService = {
  // Add a new blog post
  async addPost(post) {
    try {
      const docRef = await addDoc(collection(db, 'blogPosts'), {
        ...post,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  },

  // Update a blog post
  async updatePost(id, data) {
    try {
      await updateDoc(doc(db, 'blogPosts', id), {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  // Delete a blog post
  async deletePost(id) {
    try {
      await deleteDoc(doc(db, 'blogPosts', id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  },

  // Get all blog posts
  async getPosts() {
    try {
      const snapshot = await getDocs(collection(db, 'blogPosts'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting blog posts:', error);
      throw error;
    }
  },

  // Real-time listener for blog posts
  onPostsChange(callback) {
    return onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(posts);
    });
  },
};
