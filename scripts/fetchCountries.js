const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
	}
};

let countries = [];
const listElement = document.querySelector("#country-list");
const inputElement = document.querySelector("#country-input");

// const fetchCountrie = () => {
//     fetch('https://countries-cities.p.rapidapi.com/location/country/list', options)
// 	.then(response => response.json())
// 	.then(response => {
//         console.log(response.countries.properties);
//     }).catch(err => console.error(err));
// }

const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        countries = data.map(x => x.name.common);
        console.log(countries);
        //loadData(countries, countryListElement);
    })
}

fetchCountries();

const onInputChange = () => {
    removeAutocompleteDropdown();

    const value = inputElement.value.toLowerCase();

    const filteredNames = [];

    if(value.length === 0)
        return;

    countries.forEach(countryName => {
        if(countryName.substr(0, value.length).toLowerCase() === value)
            filteredNames.push(countryName);
    });

    //console.log(filteredNames);
    createAutocompleteDropdown(filteredNames);
}

inputElement.addEventListener("input", onInputChange);


const createAutocompleteDropdown = (list) => {
    const listEl = document.createElement("ul");
    listEl.className = "autocomplete-list";
    listEl.id = "country-list";

    list.forEach(country => {
        const listItem = document.createElement("li");

        const countryButton  = document.createElement("button");
        countryButton.innerHTML = country;
        countryButton.addEventListener("click", onEntryClick);
        listItem.appendChild(countryButton);
        
        listEl.appendChild(listItem);
    });

    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
    const listEl = document.querySelector("#country-list");
    if(listEl)
        listEl.remove();
}

const onEntryClick = (event) => {
    event.preventDefault();

    const buttonEl = event.target;
    inputElement.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}