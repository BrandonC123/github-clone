import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const firebaseConfig = {
    apiKey: "AIzaSyCIgCPWmgzDWmvB9N3G9vXpAHUzIiP_4QY",
    authDomain: "github-clone-5883f.firebaseapp.com",
    projectId: "github-clone-5883f",
    storageBucket: "github-clone-5883f.appspot.com",
    messagingSenderId: "266618086081",
    appId: "1:266618086081:web:6c295ee7b17340996dea40",
    measurementId: "G-05TEXFBX77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
const analytics = getAnalytics(app);
