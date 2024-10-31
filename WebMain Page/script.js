const validEmail = "thy1182@qq.com";
const validPassword = "123456";

// Function to open the login form
function openLoginForm() {
    document.getElementById("loginModal").style.display = "block";
}

// Function to close the login form
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Function to handle login
function loginUser(event) {
    event.preventDefault(); // Prevent page reload on form submission

    // Get the values entered by the user
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate the credentials
    if (email === validEmail && password === validPassword) {
        alert("Login successful!"); // Show success message
        closeLoginForm(); // Close the modal after successful login
    } else {
        // Show error message if credentials are invalid
        document.getElementById("loginMessage").innerText = "Invalid email or password.";
    }
}