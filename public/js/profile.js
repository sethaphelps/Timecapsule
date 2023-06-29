
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
  .querySelector(".create-entry-btn")
  .addEventListener("click", createBtnHandler);
