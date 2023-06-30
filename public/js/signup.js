const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("#####")
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const signAgain = document.querySelector(".sign-again");
  
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        //alert(response.statusText);
        signAgain.textContent = "Account with this email already exists. Use a different email or log in.";
      }
    } else {
      signAgain.textContent = "All fields must be filled";
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);