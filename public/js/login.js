const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const logAgain = document.querySelector(".log-again");

  console.log(logAgain);
  if (email && password) {
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {  
      document.location.replace('/profile');
    } else if (password.length < 8) {
      logAgain.textContent = 'Password must be at least 8 characters';
    } else {
      logAgain.textContent = 'Please enter correct password';
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


