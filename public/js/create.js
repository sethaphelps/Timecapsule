const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  const createResponse = document.querySelector(".create-response");

  if (name && description) {
    const response = await fetch(`/api/entries`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/entries/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const createBtnHandler = async (event) => {
  if (event.target.hasAttribute("create-entry-btn")) {
    const id = event.target.getAttribute("new-project-form");

    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

// document
//   .querySelector(".create-entry-btn")
//   .addEventListener("click", createBtnHandler);