console.log('Getsuga');

const myForm = document.getElementById('myForm');
const successMessage = document.getElementById('successMessage');

// 1. One single, clean event listener attached directly to the form
myForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 🛡️ Stops the 405 error page reload

  // Simple validation check
  const usernameInput = document.getElementById('username').value;
  if (usernameInput.trim() === "") {
    alert("Please enter a username.");
    return;
  }

  successMessage.textContent = "Sending data...";

  // 2. 🚀 Send data to the CORRECT fake API endpoint
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: usernameInput }) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Server communication failed.");
    }
    return response.json();
  })
  .then(data => {
    console.log("Success! Server responded with:", data); 
    successMessage.textContent = `Data successfully sent! Server created ID: ${data.id}`;
  })
  .catch(error => {
    console.error("Error sending data:", error);
    successMessage.textContent = "Failed to connect to the server.";
  });
});

// Move this out of the submit listener and run it once on page load.
// It sets up the interceptors ahead of time.
function validate() {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    // FIX 1 & 2: Use regular function so 'this' works, and close brackets properly
    input.addEventListener('invalid', function() {
      if (this.validity.valueMissing) {
        this.setCustomValidity('Suck deez');
      }
    }); // 💡 Added missing closing brackets here

    // FIX 3: Clear error when they start typing so they don't get locked out
    input.addEventListener('input', function() {
      this.setCustomValidity('');
    });
  });
}

// Call it once here to set up the interceptors
validate();
