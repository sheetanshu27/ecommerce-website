// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
// const  firebaseConfig = {
//     apiKey: "AIzaSyC2yrxpZbhFMqGQPVw39uBMUdjA041G_2A",
//     authDomain: "yash-e-commerce-2e54d.firebaseapp.com",
//     projectId: "yash-e-commerce-2e54d",
//     storageBucket: "yash-e-commerce-2e54d.appspot.com",
//     messagingSenderId: "171912308679",
//     appId: "1:171912308679:web:8f66f96b917a8a1bf2dbe2"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   //export
// export const auth=firebase.auth()
// export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC2yrxpZbhFMqGQPVw39uBMUdjA041G_2A",
    authDomain: "yash-e-commerce-2e54d.firebaseapp.com",
    projectId: "yash-e-commerce-2e54d",
    storageBucket: "yash-e-commerce-2e54d.appspot.com",
    messagingSenderId: "171912308679",
    appId: "1:171912308679:web:8f66f96b917a8a1bf2dbe2"
};

firebase.initializeApp(firebaseConfig);

//export
export const auth=firebase.auth()
export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();