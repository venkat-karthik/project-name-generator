import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc, 
  query, 
  where,
  onSnapshot 
} from 'firebase/firestore';

export const leadsService = {
  // Add a new lead
  async addLead(lead) {
    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...lead,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  },

  // Update a lead
  async updateLead(id, data) {
    try {
      await updateDoc(doc(db, 'leads', id), {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Delete a lead
  async deleteLead(id) {
    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  // Get all leads
  async getLeads() {
    try {
      const snapshot = await getDocs(collection(db, 'leads'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting leads:', error);
      throw error;
    }
  },

  // Get leads by status
  async getLeadsByStatus(status) {
    try {
      const q = query(collection(db, 'leads'), where('status', '==', status));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting leads by status:', error);
      throw error;
    }
  },

  // Real-time listener for leads
  onLeadsChange(callback) {
    return onSnapshot(collection(db, 'leads'), (snapshot) => {
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(leads);
    });
  },
};
