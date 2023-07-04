const delButtonHandler = async (event) => {
    console.log("#####")
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
    console.log("######")
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/entry');
      } else {
        alert('Failed to delete entry');
      }
    }
  };

  document
  .querySelector('#delete-btn')
  .addEventListener('click', delButtonHandler);