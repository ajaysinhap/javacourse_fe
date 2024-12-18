
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBkmg39eZfcO_h4iZY_PWXvQXpk3j5IIhI",
  authDomain: "java-course-a8ebe.firebaseapp.com",
  projectId: "java-course-a8ebe",
  storageBucket: "java-course-a8ebe.firebasestorage.app",
  messagingSenderId: "922405286486",
  appId: "1:922405286486:web:70d626544bf3fa7ea541f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firestore
const db = getFirestore(app);


export { db };


