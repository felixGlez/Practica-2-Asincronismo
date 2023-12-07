import { buttonElement } from './dom';
import { fetchData } from './functions';

buttonElement.addEventListener('click', fetchData);

fetchData();
