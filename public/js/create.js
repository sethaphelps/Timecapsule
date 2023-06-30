const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const text = document.querySelector('#project-desc').value.trim();
  const createResponse = document.querySelector(".create-response");

  if (title && text) {
    const response = await fetch(`/api/entries`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert("Entry successfully added. Click OK to return to profile.");
      document.location.replace('/profile');
    } else {
      createResponse.textContent = "cannot create";
    }
  }
};




document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);


