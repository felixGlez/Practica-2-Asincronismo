import { breedsElement } from './dom';
import { printFavs, printAllBreeds, checkSubBreeds } from './functions';

document.addEventListener('DOMContentLoaded', () => {
  const savedImages = JSON.parse(localStorage.getItem('favoritas')) || [];
  savedImages.forEach(img => {
    printFavs(img);
  });
});

breedsElement.addEventListener('change', checkSubBreeds);
printAllBreeds();
