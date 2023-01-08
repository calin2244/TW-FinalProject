let favoriteItemsStored = JSON.parse(localStorage.getItem("favItems")) || [];

//am fi putut crea un set..
let favoriteItems = [];

const favoriteButton = document.querySelector("#favorite");
const favoriteList = document.querySelector("#favorite-list");
const favoriteHeader = document.querySelector("#loading-favorites");



const fetchFavWeather = (city) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + city
    + "&units=metric&appid="
    + API_KEY
    )
    .then(response => response.json())
    .then(data => {
        const { icon } = data.weather[0];
        let { temp } = data.main;
        const favElement = document.createElement("li");
        favElement.id = "fav-li";
        const divFav = document.createElement("div");
        const imgIcon = new Image();
        imgIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
        divFav.textContent = Math.floor(temp) + "℃";
        divFav.appendChild(imgIcon);

        // const deleteButton = document.createElement("button");

        // deleteButton.innerText = "Del";
        // deleteButton.id = "delete-button";
        // favElement.append(deleteButton);

        favElement.innerText = city;

        favElement.appendChild(divFav);
        
        favoriteList.appendChild(favElement);
        favoriteHeader.style.visibility = "hidden";
    })
    .catch(console.error("Couldn't find city/country"));
}

const showFavoriteItems = () => { 

    if(favoriteItemsStored.length == 0){
        sortButton.style.opacity = "0";
        favoriteHeader.textContent = "No items currently. Add them favorites in order to see them here.";
    }
    else{
        sortButton.style.opacity = "1";
        favoriteHeader.textContent = "Loading favorites...";
    } 
    
    favoriteItemsStored.forEach(x => {
        fetchFavWeather(x);
    });
}

const removeFavoriteList = () => {
    const listEl = document.querySelectorAll("#fav-li");
    if(listEl){
        listEl.forEach(x => {
            x.remove();
        });
    }
}

//verificam daca orasul exista si poate fi bagat la favorite

const addToFavorites = () => {
    if(favoriteButton.checked && inputElement.value !== ""){
        favoriteItems.push(inputElement.value);
    }
}

inputElement.addEventListener('input', () => {
    favoriteButton.checked = favoriteItemsStored.includes(inputElement.value) ? true : false;
});


favoriteButton.addEventListener("click", addToFavorites);

//Add favorite items in the local storage so they get saved even after refreshing the page
favoriteButton.addEventListener("click", () => {
    favoriteItems.forEach(x => {
        if(!favoriteItemsStored.includes(x))
            favoriteItemsStored.push(x);
    });
    localStorage.setItem("favItems", JSON.stringify(favoriteItemsStored));


    //Il stergem din local storage / FAVORITES
    if(!favoriteButton.checked && favoriteItemsStored.includes(inputElement.value)){

        const index = favoriteItemsStored.indexOf(inputElement.value);
        favoriteItemsStored.splice(index, 1);
        localStorage.setItem("favItems", JSON.stringify(favoriteItemsStored));
    }
});

showFavoriteItems();
favoriteButton.addEventListener("click", () => {
    favoriteHeader.style.visibility = "visible";
    removeFavoriteList();
    showFavoriteItems();
});

//initial
favoriteButton.checked = favoriteItemsStored.includes(inputElement.value) ? true : false;

var favList = document.querySelector("#favorite-list li");

favoriteList.addEventListener("click", function(){
    var listEl = document.querySelectorAll("#fav-li");
    for(var i = 0; i < listEl.length; i++){
        listEl[i].onclick = function(){
            inputElement.value = this.innerText.replace(/[0-9]/g, '').replace("℃", '').replace("-", '');
            favoriteButton.checked = true;
            fetchWeather(inputElement.value);
            fetchLatAndLong(inputElement.value);
        };
    }
});

for(var i = 0; i < favList.length; i++){
    favList[i].onClick = function(){
        console.log(favList[i].innerHTML);
    }
}