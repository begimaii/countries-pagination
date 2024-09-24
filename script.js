const totalCountEl = document.getElementById("total-count");
const pageCountEl = document.getElementById("page-count");
const searchEl = document.getElementById("search");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const countriesListEl = document.querySelector(".countries");

let allCountries = [];

const url = "https://restcountries.com/v3.1/all";

function fetchCountries() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allCountries = data;
      createCountries(allCountries);
      pageCountries(allCountries);
      displayPaginatedCountries(currentPage);

      totalCountEl.innerHTML = `${allCountries.length} Countries`;
    });
}

fetchCountries();

function createCountries(countries) {
  countriesListEl.innerHTML = "";
  if (countries.length !== "") {
    countries.forEach((country) => {
      const { name, population, flags, capital } = country;

      const countryCard = `<div class="single-country">
          <img src="${flags.png}" alt="country flag" />
          <div><strong>${name.common}</strong></div>
          <div><b>Cap: ${capital}</b></div>
          <div><b>Pop:${population} </b> 100</div>
        </div> `;
      countriesListEl.innerHTML += countryCard;
    });
  }
}
const countriesPerPage = 16;
let currentPage = 1;

function pageCountries(countries) {
  const total = Math.ceil(countries.length / countriesPerPage);
  pageCountEl.innerHTML = `${currentPage}/${total}`;
}

function displayPaginatedCountries(page) {
  const start = (page - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  const paginatedCountries = allCountries.slice(start, end);
  createCountries(paginatedCountries);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPaginatedCountries(currentPage);
    pageCountries(allCountries);
  }
}

function nextPage() {
  if (currentPage * countriesPerPage < allCountries.length) {
    currentPage++;
    displayPaginatedCountries(currentPage);
    pageCountries(allCountries);
  }
}
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);
