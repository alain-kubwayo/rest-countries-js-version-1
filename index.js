// Get select element
const selectList = document.getElementById('countries');

// Get country container
const countryContainer = document.getElementById('country-container');

// Add change event to select
selectList.addEventListener('change', (event) => displaySelectedCountry(event));

function displaySelectedCountry(event) {
    displayCountryInfo(event.target.value);
}

// Array to hold fetched data from api
let allCountries;

const url = `https://restcountries.eu/rest/v2/all`;
fetch(url)
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => console.log(`Error: ${error}`))
    .finally(() => console.log(`Promise done!`))


function processData(apiData) {
    allCountries = apiData;
    // console.log(allCountries);
    let option;
    allCountries.forEach(country => {
        option = document.createElement('option');
        option.value = `${country.alpha3Code}`;
        option.text = `${country.name} (+${country.callingCodes[0]})`;
        selectList.appendChild(option);
    })
    let randomlyGeneratedCode = selectList[Math.floor(1 + Math.random() * selectList.length)].value;
    displayCountryInfo(randomlyGeneratedCode);
}

function displayCountryInfo(countryCode) {
    // get info for a selected country
    let countryInfo = allCountries.find(country => country.alpha3Code === countryCode);

    // create containers for each info we want to display
    // Flag
    let img = document.createElement('img');
    img.classList.add('w-full', 'h-80', 'mb-2');
    img.src = countryInfo.flag;
    img.alt = `Flag of ${countryInfo.name}`;

    // Country name
    let countryNameHolder = document.createElement('h1');
    countryNameHolder.classList.add('text-left', 'italic', 'uppercase', 'border-b-4', 'border-gray-500', 'md:ml-2');
    countryNameHolder.innerHTML = countryInfo.name;

    // Capital city
    let capitalCityHolder = document.createElement('p');
    capitalCityHolder.classList.add('text-left', 'md:ml-2');
    capitalCityHolder.innerHTML = `<strong>Capital: </strong>${countryInfo.capital}`;

    // Timezone
    let timezoneHolder = document.createElement('p');
    timezoneHolder.classList.add('text-left', 'md:ml-2');
    timezoneHolder.innerHTML = `<strong>Timezone: </strong>${countryInfo.timezones[0]}`;

    // Currencies
    let currenciesHolder = document.createElement('p');
    currenciesHolder.classList.add('text-left', 'md:ml-2');
    let allCurrencies = countryInfo.currencies.filter(currency => currency.name).map(currency => `${currency.name} (${currency.code})`).join(' - ');
    currenciesHolder.innerHTML = `<strong>Currencies: </strong> ${allCurrencies}`;

    // Languages
    let languagesHolder = document.createElement('p');
    languagesHolder.classList.add('text-left', 'md:ml-2');
    let languages = countryInfo.languages.map(language => language.name).join(', ');
    languagesHolder.innerHTML = `<strong>Languages: </strong> ${languages}`;

    // Population
    let populationHolder = document.createElement('p');
    populationHolder.classList.add('text-left', 'md:ml-2');
    let population = countryInfo.population.toLocaleString();
    console.log(population);
    populationHolder.innerHTML = `<strong>Population: </strong> ${population}`;

    // Region
    let regionHolder = document.createElement('p');
    regionHolder.classList.add('text-left', 'md:ml-2');
    regionHolder.innerHTML = `<strong>Region: </strong> ${countryInfo.region}`;

    // Subregion
    let subregionHolder = document.createElement('p');
    subregionHolder.classList.add('text-left', 'md:ml-2');
    subregionHolder.innerHTML = `<strong>Subregion: </strong> ${countryInfo.subregion}`;

    // add created elements to the DOM

    // first initialize the container
    countryContainer.innerHTML = '';
    countryContainer.appendChild(img);
    countryContainer.appendChild(countryNameHolder);
    countryContainer.appendChild(capitalCityHolder);
    countryContainer.appendChild(timezoneHolder);
    countryContainer.appendChild(currenciesHolder);
    countryContainer.appendChild(languagesHolder);
    countryContainer.appendChild(regionHolder);
    countryContainer.appendChild(subregionHolder);
    countryContainer.appendChild(populationHolder);

}













