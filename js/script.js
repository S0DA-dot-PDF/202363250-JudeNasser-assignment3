
/* Jude Nasser - 202363250 - SWE 363 Assignment 1
   Night mode button. No colours in here - this only flips the
   data-theme attribute and the CSS does the rest.
*/

import { useState, useEffect } from "react";

function ThemeToggle() {

    // Store the current theme
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "Light"
    );

    // Save and apply the theme whenever it changes
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Switch between Light and Dark
    function toggleTheme() {
        setTheme(theme === "Light" ? "Dark" : "Light");
    }

    return (
        <button
            id="themeToggle"
            onClick={toggleTheme}
            aria-pressed={theme === "Dark"}
        >
            {theme === "Light" ? "Night mode" : "Day mode"}
        </button>
    );
}


// Assignment 2: Contact Form

function ContactForm() {

    // Retrieve the saved name
    const savedName = localStorage.getItem("name") || "";

    // Store form values
    const [name, setName] = useState(savedName);
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // Store feedback messages
    const [greetingMessage, setGreetingMessage] = useState(
        savedName ? `Welcome back, ${savedName}!` : ""
    );

    const [errorMessage, setErrorMessage] = useState("");

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Clear previous messages
        setErrorMessage("");
        setGreetingMessage("");

        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();
        const trimmedMessage = message.trim();

        // Validate the fields
        if (!trimmedName || !trimmedPhone || !trimmedMessage) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // Validate Saudi phone number
        if (!/^(05\d{8}|\+9665\d{8})$/.test(trimmedPhone)) {
            setErrorMessage("Please enter a valid Saudi phone number.");
            return;
        }

        // Save the name only after successful validation
        localStorage.setItem("name", trimmedName);

        // Greet the user immediately
        setGreetingMessage(`Welcome, ${trimmedName}!`);
    }

    return (
        <form id="contactForm" onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor="phone">Phone Number</label>
            <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="05XXXXXXXX"
            />

            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit">Submit</button>

            <p id="greetingMessage">{greetingMessage}</p>
            <p id="errorMessage">{errorMessage}</p>

        </form>
    );
}

export { ThemeToggle, ContactForm };
