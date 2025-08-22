export const firebaseConfig = () => ({
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'storymagic-dev',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  },
});