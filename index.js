const toggleBtn = document.getElementById('mode-toggle');
toggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  // Change icon
  if(document.body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '🌙';
  } else {
    toggleBtn.textContent = '☀️';
  }
});



import { getDatabase, ref, push } from "firebase/database";
const database = getDatabase(app);
const contactFormDB = ref(database, "contactForm");


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL5BjMgWH5tH_aJUuV_Ok6RWit7OsOrp8",
  authDomain: "newproject-33abe.firebaseapp.com",
  databaseURL: "https://newproject-33abe-default-rtdb.firebaseio.com",
  projectId: "newproject-33abe",
  storageBucket: "newproject-33abe.firebasestorage.app",
  messagingSenderId: "820098979741",
  appId: "1:820098979741:web:50c09d14227a7624d70174",
  measurementId: "G-HRNGPFV1W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
push(contactFormDB, {
  name: name,
  email: email,
  message: message,
  timestamp: new Date().toISOString()
});


  alert("Message sent successfully!");
  document.getElementById("contactForm").reset();
}

