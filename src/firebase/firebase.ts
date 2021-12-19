import app from "firebase";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;


const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
if (!app.app.length) {
  app.analytics();
}

export const firebaseStorage = app.storage();
export const galleryFirestore = app.firestore();

class FirebaseAuth {
  auth: any;
  constructor() {
    this.auth = app.auth();
  }
  
  async signInWithGoogle() {
    const googleProvider = new app.auth.GoogleAuthProvider();
    const details: any = await app.auth().signInWithPopup(googleProvider);
    
    return details;
  }
  async signInWithTwitter() {
    const twitterProvider = new app.auth.TwitterAuthProvider();
    const details: any = await app.auth().signInWithPopup(twitterProvider);

    let data = {
      ...details?.additionalUserInfo?.profile,
      email: details?.user?.email,
      emailVerified: details?.user?.emailVerified,
      username: details?.additionalUserInfo?.username,
      phoneNumber: details?.user?.phoneNumber,
    };

    return data;
    // return details?.additionalUserInfo?.profile
  }

  async facebookSignout() {
    await app.auth().signOut();
    sessionStorage.removeItem("hahyvToken");
    sessionStorage.removeItem("hahyvUser");
  }
}

export const firebaseAnalytics = app.analytics();
export const auth = new FirebaseAuth();

// export auth;
