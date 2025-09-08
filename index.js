
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";
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
const database = getDatabase(app);
const contactFormDB = ref(database, "contactForm");

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


















// Fetch GitHub projects and display them
const username = "NB-Hlongwana"; 
const projectsContainer = document.getElementById("projectsContainer");
const filterInput = document.getElementById("filterInput");


const priorityOrder = [
  "My---Portfolio",
  "Online-Cake-Management-S",
  "WebProject",
  "Laundry-Service",
  "Project-Management-System",
  "Doctors-Appointment"
];

async function fetchProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    // Sort repos: first by priorityOrder, then the rest alphabetically
    const sortedRepos = [
      ...priorityOrder
        .map(name => repos.find(r => r.name === name))
        .filter(Boolean),
      ...repos.filter(r => !priorityOrder.includes(r.name)).sort((a, b) => a.name.localeCompare(b.name))
    ];

    displayProjects(sortedRepos);

    filterInput.addEventListener("input", () => {
      const searchTerm = filterInput.value.toLowerCase();
      const filtered = sortedRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm) ||
        (repo.language && repo.language.toLowerCase().includes(searchTerm))
      );
      displayProjects(filtered);
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

function displayProjects(repos) {
  projectsContainer.innerHTML = "";
  repos.forEach(repo => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const liveDemoUrl = `https://${username}.github.io/${repo.name}/`;

    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description ? repo.description : "No description"}</p>
      ${repo.language ? <span class="language-badge">${repo.language}</span> : ""}
      <div class="project-links">
        <a href="${repo.html_url}" target="_blank">View Code</a>
      </div>
    `;

    projectsContainer.appendChild(card);
  });
}

fetchProjects();