import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc, 
  getDoc,
  onSnapshot 
} from 'firebase/firestore';

export const projectsService = {
  // Add a new project
  async addProject(project) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  // Update a project
  async updateProject(id, data) {
    try {
      await updateDoc(doc(db, 'projects', id), {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(id) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get all projects
  async getProjects() {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  // Get project by ID
  async getProjectById(id) {
    try {
      const docSnap = await getDoc(doc(db, 'projects', id));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  // Real-time listener for projects
  onProjectsChange(callback) {
    return onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(projects);
    });
  },
};
