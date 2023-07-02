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
    }
  } else if (!title){
    createResponse.textContent = "Title cannot be blank";
  }
  else {
    createResponse.textContent = "Description cannot be blank";
  }
};

window.ajaxSuccess = function () {
  let response = JSON.parse(this.responseText);
  console.log("ajaxSuccess", typeof this.responseText);
  console.log(response)
  document
    .getElementById("uploaded")
    .setAttribute("src", response["secure_url"]);
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


