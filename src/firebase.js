import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvDHV0AZQpN5duDXj9epwc0EiIKBuaKRs",
  authDomain: "mern-whatsapp-38f36.firebaseapp.com",
  projectId: "mern-whatsapp-38f36",
  storageBucket: "mern-whatsapp-38f36.appspot.com",
  messagingSenderId: "224065582772",
  appId: "1:224065582772:web:962b4aaa132dfa223249e1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider, app };
