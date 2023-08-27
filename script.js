function getImages() {
    fetch(
      'https://casamiento-production-e973.up.railway.app/upload'
      // 'http://localhost:3000/upload'
      , { 
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.success) {
          const gallery = document.getElementById('gallery');
          
          gallery.innerHTML = '';

        data.images.forEach(image => {
          const imageContainer = document.createElement('div');
          imageContainer.className = 'image-container';
  
          const imgElement = document.createElement('img');
          imgElement.src = image.ruta;
          
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'x';
          deleteButton.addEventListener('click', () => deleteImage(image._id, imageContainer));
          
          imageContainer.appendChild(imgElement);
          imageContainer.appendChild(deleteButton);
          
          gallery.appendChild(imageContainer);
        });     
      } else {
        console.log(data.message);
      }
    })
    .catch(error => console.log(error));
  }
    
  document.addEventListener('DOMContentLoaded', () => {
    getImages();
  });

  function deleteImage(imageId, imageContainer) {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta imagen?');
    if (confirmDelete) {
      fetch(
        `https://casamiento-production-e973.up.railway.app/upload/${imageId}`
        // `http://localhost:3000/upload/${imageId}`
        , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          if (imageContainer) {
            imageContainer.remove();
          }
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log(error)
        // location.reload();
      });
    }
  }