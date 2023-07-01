const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const tryAgain = document.querySelector(".try-again");

  console.log(tryAgain);
  if (email && password) {
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    
      document.location.replace('/profile');
    } else {
      alert("Wrong password try again");
 
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


