import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

const OFFICIAL_EMAIL = 'velfound1@gmail.com';

export const contactService = {
  // Submit a contact form
  async submitContactForm(formData) {
    try {
      const docRef = await addDoc(collection(db, 'contactQueries'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        service: formData.service || '',
        message: formData.message,
        status: 'new', // new, contacted, resolved
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Log to audit
      console.log('Contact form submitted:', docRef.id);
      
      return {
        success: true,
        id: docRef.id,
        message: `Thank you for reaching out! We'll contact you at ${formData.email} within 2 hours.`,
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Get all contact queries (admin only)
  async getContactQueries() {
    try {
      const snapshot = await getDocs(collection(db, 'contactQueries'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting contact queries:', error);
      throw error;
    }
  },

  // Update contact query status (admin only)
  async updateQueryStatus(id, status) {
    try {
      await updateDoc(doc(db, 'contactQueries', id), {
        status,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating query status:', error);
      throw error;
    }
  },

  // Get official email
  getOfficialEmail() {
    return OFFICIAL_EMAIL;
  },
};
