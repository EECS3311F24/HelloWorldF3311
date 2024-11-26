function openLoginForm() {
    document.getElementById("loginModal").style.display = "block";
}

// Function to close the login form
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Function to handle login form submission
async function loginUser(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Make a POST request to the login endpoint
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, userPassword: password }) // JSON payload with email and password
        });

        const result = await response.text();

        if (response.ok) {
            alert(result); // Show success message (e.g., "Login successful")
            closeLoginForm(); // Close the modal if login is successful
        } else {
            // Display error message (e.g., "Invalid email or password")
            document.getElementById("loginMessage").innerText = result;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("loginMessage").innerText = "An error occurred. Please try again.";
    }
}