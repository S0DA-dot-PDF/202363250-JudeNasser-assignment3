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






