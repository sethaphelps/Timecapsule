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