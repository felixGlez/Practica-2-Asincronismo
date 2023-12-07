//Seguir esta estructura:
//Hacer una función que haga peticiones (fetchdata)
//Hacer una función que la pinte (printData)

//SELECTORES
const mainElement = document.getElementById('main');
const breedsElement = document.getElementById('breeds');

//VARIABLES
let dataBreeds;

//URLS
const breedsURL = 'https://dog.ceo/api/breeds/list/all';

//PETICIÓN
const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

//PINTAR PETICIÓN
const printData = async () => {
  const data = await fetchData(breedsURL);
  dataBreeds = data.message;

  const onlyKeys = Object.keys(dataBreeds);

  const fragment = document.createDocumentFragment();
  onlyKeys.forEach(breed => {
    const newOption = document.createElement('option');
    newOption.value = breed;
    newOption.textContent = breed;
    fragment.append(newOption);
  });
  breedsElement.append(fragment);
};

//COMPROBAR SI TIENE SUBRAZAS
const checkSubBreeds = async event => {
  const selectedBreed = event.target.value;
  const subBreeds = dataBreeds[selectedBreed];

  console.log(dataBreeds);
  console.log(subBreeds);

  if (subBreeds.length > 0) {
    const newSelect = document.createElement('select');
    for (const subBreed of subBreeds) {
      const newOption = document.createElement('option');
      newOption.value = subBreed;
      newOption.textContent = subBreed;
      newSelect.append(newOption);
    }
    mainElement.append(newSelect);
  }
};

breedsElement.addEventListener('change', checkSubBreeds);
printData();
