// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCr912gXlpaBBdvwyqb_MbE8uwe5_nRHVs",

    authDomain: "qrcontacts-1ece3.firebaseapp.com",

    projectId: "qrcontacts-1ece3",

    storageBucket: "qrcontacts-1ece3.appspot.com",

    messagingSenderId: "768115489509",

    appId: "1:768115489509:web:15a907e32f056db020f20c"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
