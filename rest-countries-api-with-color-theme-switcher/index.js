let modeIsDark = 0;

const mainElement = document.getElementById("container");
const modeSwitcher = document.getElementById("mode-switcher");
const searchInput = document.getElementById("country-search");
const filterPanel = document.getElementById("filter-panel");
const homePage = document.getElementById("home-page");
const detailPage = document.getElementById("detail-page");
const backButton = document.getElementById("back-btn");

let countryInfos = [];

function createFlag(url, name) {
  const flag = document.createElement("img");
  flag.setAttribute("src", url);
  flag.setAttribute("alt", name);

  return flag;
}

function createNameNode(name) {
  const nameNone = document.createElement("h1");
  nameNone.innerHTML = name;
  return nameNone;
}

function createBodyNode(ci) {
  const bodyNode = document.createElement("div");
  bodyNode.innerHTML = `
  <div class="detail-left">
  <p><span>Native Name:</span> ${ci.nativeName}</p>
  <p><span>Population:</span> ${ci.population
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
  <p><span>Region:</span> ${ci.region}</p>
  <p><span>Sub Region:</span> ${ci.subregion}</p>
  <p><span>Capital:</span> ${ci.capital}</p>
  </div>
  <div class="detail-right">
  <p><span>Top Level Domain:</span> ${ci.topLevelDomain}</p>
  <p><span>Currencies:</span> ${ci.currencies
    .map((item) => item.name)
    .join(", ")}</p>
  </div>`;

  return bodyNode;
}

function createBorderNode(ci) {}

function createDetail(ci) {
  const container = document.createElement("div");
  container.appendChild(createNameNode(ci.name));
  container.appendChild(createBodyNode(ci));
  return container;
}

function renderDetailPage(ci) {
  const detail = document.createElement("div");

  detail.classList.add("country-detail");

  detail.appendChild(createFlag(ci.flag), ci.name);

  detail.appendChild(createDetail(ci));

  detailPage.appendChild(detail);
}

function createCountryInfoCard(ci) {
  const card = document.createElement("div");
  card.classList.add("country-info-card");

  const flag = document.createElement("img");
  flag.setAttribute("src", ci.flag);
  flag.setAttribute("alt", ci.name);
  card.appendChild(flag);

  const details = document.createElement("div");
  details.innerHTML = `<div>
  <h3>${ci.name}</h3>
  <p><span>Population:</span> ${ci.population
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
  <p><span>Region:</span> ${ci.region}</p>
  <p><span>Capital:</span> ${ci.capital}</p>
  </div>`;

  card.appendChild(details);

  card.addEventListener("click", () => {
    homePage.style.display = "none";
    detailPage.style.display = "flex";
    renderDetailPage(ci);
  });

  return card;
}

function renderCountries() {
  for (let ci of countryInfos) {
    homePage.appendChild(createCountryInfoCard(ci));
  }
}

function fetchCountryInfos() {
  const url = "https://restcountries.eu/rest/v2/all";
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      countryInfos = res;
      renderCountries();
    });
}

function renderPage() {
  // initial style is light mode
  mainElement.classList.add("light-mode");

  fetchCountryInfos();

  // when click the mode switcher, we change the mode to opposite
  modeSwitcher.addEventListener("click", () => {
    modeIsDark = !modeIsDark;

    if (modeIsDark) {
      mainElement.classList.remove("light-mode");
      mainElement.classList.add("dark-mode");
    } else {
      mainElement.classList.remove("dark-mode");
      mainElement.classList.add("light-mode");
    }
  });

  searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.children[0].value);
  });

  filterPanel.addEventListener("click", (e) => {
    console.log(e.target);
    if (filterPanel.children[1].style.display === "block") {
      filterPanel.children[1].style.display = null;
    } else {
      filterPanel.children[1].style.display = "block";
    }
  });

  backButton.addEventListener("click", () => {
    homePage.style.display = "flex";
    detailPage.style.display = "none";
    console.log(detailPage.children);
    detailPage.removeChild(detailPage.children[1]);
  });
}

renderPage();
