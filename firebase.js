// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from  "firebase/firestore";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCrP8R92z75lYZxidUOcm3qoeuTg8crXco",
    authDomain: "bancositesimples.firebaseapp.com",
    projectId: "bancositesimples",
    storageBucket: "bancositesimples.appspot.com",
    messagingSenderId: "830226107169",
    appId: "1:830226107169:web:adf9b5fe52c26d6fba0c60",
    measurementId: "G-HH4RDR2WY0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  console.log(db)

  const querySnapshot = await getDocs(collection(db, "Produtos"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });

