import { getToken, MessagePayload, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/config';

export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      throw new Error('Firebase messaging is not available');
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Get the token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (token) {
        return token;
      }
    }

    throw new Error('Failed to get notification permission');
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    throw error;
  }
};

export const onMessageListener = (): Promise<MessagePayload> => {
  if (!messaging) {
    return Promise.reject(new Error('Firebase messaging is not available'));
  }

  // We can safely use non-null assertion here because we checked above
  const messagingInstance = messaging!;
  
  return new Promise((resolve) => {
    onMessage(messagingInstance, (payload) => {
      resolve(payload);
    });
  });
};
