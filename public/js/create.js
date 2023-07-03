let imageUrl;

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const text = document.querySelector('#project-desc').value.trim();

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

window.ajaxSuccess = function() {
  try {
    let response = JSON.parse(this.responseText);
    console.log("ajaxSuccess", typeof this.responseText);
    console.log(response.url);
    imageUrl = response.url;
    document.getElementById("uploaded").setAttribute("src", response.secure_url);
  } catch {
    console.log("error");
  }
  document.getElementById("results").innerText = this.responseText;
};

window.AJAXSubmit = function (formElement) {
  console.log("starting AJAXSubmit");
  if (!formElement.action) {
    console.log("fail");
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open(
    "post",
    "https://api.cloudinary.com/v1_1/dskznsjca/image/upload"
  );
  xhr.send(new FormData(formElement));
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

