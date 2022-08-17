// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMEs60OsFoFHMCD5z1YkyY7p3b5qgJyMU",
    authDomain: "stank-chat-42.firebaseapp.com",
    databaseURL: "https://stank-chat-42-default-rtdb.firebaseio.com",
    projectId: "stank-chat-42",
    storageBucket: "stank-chat-42.appspot.com",
    messagingSenderId: "735953461532",
    appId: "1:735953461532:web:a4dd4d3db99177bd679ad9"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);


export default firebase;