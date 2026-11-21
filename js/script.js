/* Jude Nasser - 202363250 - SWE 363 Assignment 1
   Night mode button. No colours in here - this only flips the
   data-theme attribute and the CSS does the rest. */


const toggle = document.querySelector("#themeToggle");
const root = document.documentElement;

let theme = localStorage.getItem("theme") || "Light";

// Apply the theme
function applyTheme() {
    if (theme === "Dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }

    // Update button text
    toggle.textContent = theme === "Dark" ? "Day mode" : "Night mode";
    // Update accessibility attribute
    toggle.setAttribute("aria-pressed", String(theme === "Dark"));
}

// Switch between Light and Dark
toggle.addEventListener("click", () => {
    theme = theme === "Dark" ? "Light" : "Dark";

    localStorage.setItem("theme", theme);

    applyTheme();

    console.log("Theme changed to:", theme);
    document.title = "theme: " + theme + " | saved: " + localStorage.getItem("theme");
});

applyTheme();


// assignment 2: from here and below 


const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const greetingMessage = document.getElementById("greetingMessage");
const errorMessage = document.getElementById("errorMessage");

// Greet returning users who already have a saved name
const savedName = localStorage.getItem("name");

if (savedName) {
    greetingMessage.textContent = `Welcome back, ${savedName}!`;
    nameInput.value = savedName;
}

// Handle form submission

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear 
    errorMessage.textContent = "";
    greetingMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate the fields
    if (!name || !email || !message) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!emailInput.validity.valid) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Save the name only after successful validation
    localStorage.setItem("name", name);

    // Greet the user immediately
    greetingMessage.textContent = `Welcome, ${name}!`;
});

///
const quoteElement = document.getElementById("quote");
const quoteButton = document.getElementById("quoteButton");
quoteButton.addEventListener("click", loadQuote);

async function loadQuote() {
  quoteElement.textContent = "Loading…";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("Bad response");
    const data = await response.json();

    quoteElement.textContent = `"${data.quote}" — ${data.author}`;

  } catch (error) {
    quoteElement.textContent = "Sorry, we couldn't load a quote. Please try again.";

  }
}
///



function renderProjects(list) {
  const container = document.querySelector(".projects");
  container.innerHTML = "";              // clear the old cards

  list.forEach(function (project) {

// Build one card for this project
const card = document.createElement("div");
card.classList.add("projectsCard");

const name = document.createElement("h2");
name.textContent = project.name;

const description = document.createElement("p");
description.textContent = project.description;

const image = document.createElement("img");
image.src = project.image;
image.alt = project.name;

const link = document.createElement("a");
link.href = project.link;
link.textContent = project.linkText;

const category = document.createElement("p");
category.textContent = project.category;

const date = document.createElement("p");
date.textContent = project.date;

card.appendChild(name);
card.appendChild(description);
card.appendChild(image);
card.appendChild(link);
card.appendChild(category);
card.appendChild(date);

// Add card to container
container.appendChild(card);

  });
}


const projects = [
        {
        name: "KFUPM Bachelor",
        description: "I am currently fighting for my degree at KFUPM. I accept all prayers and thoughts.",
        link: "https://youtu.be/…",
        linkText: "You don't know KFUPM?!",
        image: "assets/images/kfupmPicture.png",
        category: "academic"
        },


        {
        name: "Art Portfolio",
        description: "This is a hobby i have had for way too long.",
        link: "https://unleashed-dust-969.notion.site/Jude-s-Portfolio-27073256f5df80afaaacc9c4e485c39f?source=copy_link",
        linkText: "for the CURIOUS",
        image: "assets/images/artPicture.png",
        category: "creative"
        }
];

