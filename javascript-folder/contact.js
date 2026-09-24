console.log('Getsuga');

const myForm = document.getElementById('myForm');
const successMessage = document.getElementById('successMessage');

// 1. One single, clean event listener attached directly to the form
myForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 🛡️ Stops the 405 error page reload

  const usernameInput = document.getElementById('username').value;

  // Simple validation check
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
    // Look closely at your console when this fires!
    console.log("Success! Server responded with:", data); 
    successMessage.textContent = `Data successfully sent! Server created ID: ${data.id}`;
  })
  .catch(error => {
    console.error("Error sending data:", error);
    successMessage.textContent = "Failed to connect to the server.";
  });
});

function validate() {
const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
const validityState = input.validity;



if (validityState.valueMissing) {
  input.setCustomValidity("Suck deez");
} 

  input.reportValidity();
});
}

validate()
