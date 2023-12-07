import { adviceElement, quoteElement } from './dom';

const printError = err => {
  console.log(err);
};

const printQuote = quote => {
  quoteElement.textContent = `'${quote.slip.advice}'`;
};

const printAdvice = advice => {
  adviceElement.textContent = `ADVICE #${advice.slip.id}`;
};

const request = url => fetch(url);

export const fetchData = async () => {
  try {
    const response = await request('https://api.adviceslip.com/advice');
    const data = await response.json();
    printQuote(data);
    printAdvice(data);
  } catch (err) {
    printError(err);
  }
};
