import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      email: email.toLowerCase().trim(),
      subscribedAt: serverTimestamp(),
      active: true,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

// Get all newsletter subscribers
export const getNewsletterSubscribers = async () => {
  try {
    const q = query(collection(db, 'newsletter_subscribers'), orderBy('subscribedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (subscriberId) => {
  try {
    await deleteDoc(doc(db, 'newsletter_subscribers', subscriberId));
  } catch (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }
};

// Check if email is already subscribed
export const checkEmailSubscription = async (email) => {
  try {
    const q = query(collection(db, 'newsletter_subscribers'));
    const querySnapshot = await getDocs(q);
    const subscriber = querySnapshot.docs.find(doc => doc.data().email === email.toLowerCase().trim());
    return subscriber ? { id: subscriber.id, ...subscriber.data() } : null;
  } catch (error) {
    console.error('Error checking subscription:', error);
    throw error;
  }
};
