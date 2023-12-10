//SELECTORES
const mainElement = document.getElementById('main');
const breedsElement = document.getElementById('breeds');

//VARIABLES
let dataBreeds;

//URLS
const breedsURL = 'https://dog.ceo/api/breeds/list/all';

//PETICIÓN
const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//PINTAR TODAS LAS RAZAS
const printAllBreeds = async () => {
  const data = await fetchData(breedsURL);
  dataBreeds = data.message;

  const onlyKeys = Object.keys(dataBreeds);

  const fragment = document.createDocumentFragment();

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Selecciona una raza';
  fragment.append(defaultOption);

  onlyKeys.forEach(breed => {
    const newOption = document.createElement('option');
    newOption.value = breed;
    newOption.textContent = breed;
    fragment.append(newOption);
  });
  breedsElement.append(fragment);
};

//COMPROBAR SI TIENE SUBRAZAS
const checkSubBreeds = async () => {
  const selectedBreed = breedsElement.value;
  const subBreeds = dataBreeds[selectedBreed];

  const existingSelect = document.getElementById('sub-breeds');
  if (existingSelect) {
    existingSelect.remove();
  }

  if (subBreeds.length > 0) {
    const newSelect = document.createElement('select');
    newSelect.id = 'sub-breeds';
    newSelect.classList.add('main__select');

    if (subBreeds.length > 1) {
      const defaultOption = document.createElement('option');
      defaultOption.textContent = 'Seleccione una subraza';
      newSelect.append(defaultOption);
    }

    for (const subBreed of subBreeds) {
      const newOption = document.createElement('option');
      newOption.value = subBreed;
      newOption.textContent = subBreed;
      newSelect.append(newOption);
    }

    mainElement.append(newSelect);
  }
  generateButton();
};

//CREAR BOTÓN
const generateButton = async () => {
  const existingButton = document.getElementById('button');
  const existingImg = document.getElementById('dog-image');

  if (existingButton) {
    existingButton.remove();
  }
  if (existingImg) {
    existingImg.remove();
  }

  const newButton = document.createElement('button');
  newButton.id = 'button';
  newButton.classList.add('main__button');
  newButton.textContent = 'VER PERRITO';
  mainElement.append(newButton);

  newButton.addEventListener('click', getDogImage);
};

//OBTENER IMÁGENES DE PERROS
const getDogImage = async () => {
  const selectedBreed = breedsElement.value; //Valor 1º Select
  const subBreedsElement = document.getElementById('sub-breeds');
  let selectedSubBreed = '';
  if (subBreedsElement) {
    selectedSubBreed = subBreedsElement.value; //Valor 2º select
  }

  const breedUrl = `https://dog.ceo/api/breed/${selectedBreed}/images`;
  const subBreedUrl = `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images`;

  try {
    if (selectedSubBreed === '') {
      const data = await fetchData(breedUrl);
      const imgUrls = data.message;

      const randomNumber = Math.floor(Math.random() * imgUrls.length);
      const selectedImg = imgUrls[randomNumber];
      printDogImage(selectedImg);
    } else {
      if (selectedSubBreed === 'Seleccione una subraza') {
        // Muestra un alert
        alert('¡Selecciona una subraza!');
        return;
      }
      const data = await fetchData(subBreedUrl);
      const imgUrls = data.message;

      const randomNumber = Math.floor(Math.random() * imgUrls.length);
      const selectedImg = imgUrls[randomNumber];
      printDogImage(selectedImg);
    }
  } catch (error) {
    console.log(error);
  }
};

//PINTAR IMÁGENES DE PERROS
const printDogImage = async img => {
  const existingImg = document.getElementById('dog-image');

  if (existingImg) {
    existingImg.remove();
  }

  //container
  const newDiv = document.createElement('div');
  newDiv.id = 'dog-image';
  newDiv.classList.add('main__dog-img-container');
  //img
  const newImg = document.createElement('img');
  newImg.src = img;
  newImg.classList.add('main__dog-img');
  //like button
  const newButton = document.createElement('button');
  newButton.id = 'like';
  newButton.classList.add('main__like-button');
  newButton.innerHTML = '<i class="far fa-heart"></i>';

  newDiv.append(newImg, newButton);
  mainElement.append(newDiv);

  newButton.addEventListener('click', () => saveFavs(img));
};

const saveFavs = async img => {
  // Obtener las imágenes favoritas del LocalStorage o inicializar un array vacío
  const savedImages = JSON.parse(localStorage.getItem('favoritas')) || [];

  // Verificar si la imagen ya está en favoritas antes de agregarla
  if (!savedImages.includes(img)) {
    savedImages.push(img);
    console.log(savedImages);

    // Guardar el array actualizado en el LocalStorage
    localStorage.setItem('favoritas', JSON.stringify(savedImages));
    alert('Imagen guardada como favorita.');
    printFavs(img);
  } else {
    alert('Esta imagen ya está guardada como favorita.');
  }
};

const printFavs = img => {
  const favImgsElement = document.getElementById('favs-imgs');
  //crear div
  const newDiv = document.createElement('div');
  newDiv.classList.add('main__fav-img-container');
  //crear img
  const newImg = document.createElement('img');
  newImg.src = img;
  //crear botón
  const newButton = document.createElement('button');
  newButton.id = 'dislike-button';
  newButton.textContent = 'X';
  newButton.classList.add('main__like-button', 'main__dislike-button');

  newDiv.append(newImg, newButton);
  favImgsElement.append(newDiv);

  newButton.addEventListener('click', event => {
    if (event.target.id !== 'dislike-button') return;
    newDiv.remove();

    const savedImages = JSON.parse(localStorage.getItem('favoritas') || []);
    const updatedImages = savedImages.filter(saved => saved !== img);
    localStorage.setItem('favoritas', JSON.stringify(updatedImages));
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Obtener las imágenes favoritas del LocalStorage
  const favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];

  // Imprimir las imágenes favoritas
  favoritas.forEach(img => {
    printFavs(img);
  });
});

breedsElement.addEventListener('change', checkSubBreeds);
printAllBreeds();
