const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const tryAgain = document.querySelector(".try-again");

  console.log(tryAgain);
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      //alert(response.statusText);
      tryAgain.textContent = "Wrong email or password. Try again."
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
 
  var showListBtn = document.querySelector(".sign-btn");

showListBtn.addEventListener("click", function() {
  window.location.href = "/signup"; 
});

