let imageUrl;

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#entry-name').value.trim();
  const text = document.querySelector('#entry-desc').value.trim();

  const createResponse = document.querySelector(".create-response");

  if (title && text && imageUrl) {
    try {
      const response = await fetch(`/api/entries`, {
        method: 'POST',
        body: JSON.stringify({ title, text, imageUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert("Entry successfully added. Click OK to return to profile.");
        document.location.replace('/profile');
      } else {
        createResponse.textContent = "Failed to create entry.";
      }
    } catch (err) {
      console.error(err);
      createResponse.textContent = "An error occurred while creating the entry.";
    }
  } else if (!title) {
    createResponse.textContent = "Title cannot be blank";
  } else if (!text) {
    createResponse.textContent = "Description cannot be blank";
  } else {
    createResponse.textContent = "Please upload an image.";
  }
};

document
  .querySelector('.new-entry-form')
  .addEventListener('submit', newFormHandler);
