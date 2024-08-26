import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwNbxkMWjp6h3CBnCwqp1-8SJGxb8Qnw",
  authDomain: "proyecto-coder-de69c.firebaseapp.com",
  projectId: "proyecto-coder-de69c",
  storageBucket: "proyecto-coder-de69c.appspot.com",
  messagingSenderId: "652483579558",
  appId: "1:652483579558:web:9708f890806163d700ee67"
};

// Initialize Firebase
initializeApp(firebaseConfig);