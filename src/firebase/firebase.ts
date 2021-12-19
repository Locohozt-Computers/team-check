import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import { createHttp } from "utils/api/createHttp";
import { googleResponse } from "utils/googleResponse";

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
// const firebaseConfig = {
//   apiKey: "AIzaSyB0Jci_cwFOXwu8ZMZbHIN90E3L5KW8ddU",
//   authDomain: "tech-point-phone.firebaseapp.com",
//   projectId: "tech-point-phone",
//   storageBucket: "tech-point-phone.appspot.com",
//   messagingSenderId: "123586626638",
//   appId: "1:123586626638:web:fb69f0b0a7b1d16c536f1f",
//   measurementId: "G-N065XDRFMT",
// };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const details: any = await signInWithPopup(auth, googleProvider);

  await createHttp("/register", {
    ...googleResponse(details).user,
    password_confirmation: "Abcde12345!",
    password: "Abcde12345!",
    provider: "google",
  });

  return details;
};
