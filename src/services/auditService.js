import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs,
  onSnapshot 
} from 'firebase/firestore';

export const auditService = {
  // Add an audit log
  async addLog(log) {
    try {
      const docRef = await addDoc(collection(db, 'auditLogs'), {
        ...log,
        timestamp: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding audit log:', error);
      throw error;
    }
  },

  // Get all audit logs
  async getLogs() {
    try {
      const snapshot = await getDocs(collection(db, 'auditLogs'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting audit logs:', error);
      throw error;
    }
  },

  // Real-time listener for audit logs
  onLogsChange(callback) {
    return onSnapshot(collection(db, 'auditLogs'), (snapshot) => {
      const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(logs);
    });
  },
};
