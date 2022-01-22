const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestionsDisplay = document.querySelector('.suggestions');

let citiesArr = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    citiesArr = [...data];
  });

function searchForMatch(inputString, citiesArr) {
  return citiesArr.filter((city) => {
    const regex = new RegExp(inputString, 'gi');
    return city.city.match(regex) || city.state.match(regex);
  });
}

function numberWithCommas(population) {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showMatchList() {
  const matchesArr = searchForMatch(this.value, citiesArr);
  const matchHtml = matchesArr
    .map((city) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = city.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = city.state.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(city.population)}</span>
      </li>
      `;
    })
    .join('');
  suggestionsDisplay.innerHTML = matchHtml;
}

searchInput.addEventListener('change', showMatchList);
searchInput.addEventListener('keyup', showMatchList);
