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

// const signupFormHandler = async (event) => {
//   event.preventDefault();
//   console.log("#####")
//   const name = document.querySelector('#name-signup').value.trim();
//   const email = document.querySelector('#email-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();
//   const signAgain = document.querySelector(".sign-again");


//   if (name && email && password) {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       //alert(response.statusText);
//       signAgain.textContent = "Account with this email already exists. Use a different email or log in.";
//     }
//   } else {
//     signAgain.textContent = "All fields must be filled";
//   }
// };

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
 
  var showListBtn = document.querySelector(".sign-btn");

showListBtn.addEventListener("click", function() {
  window.location.href = "/signup"; 
});

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);
