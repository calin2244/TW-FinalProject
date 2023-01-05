let favoriteItemsStored = JSON.parse(localStorage.getItem("favItems")) || [];
let favoriteItems = [];

const favoriteButton = document.querySelector("#favorite");

const addToFavorites = () => {
    if(favoriteButton.checked && inputElement.value != ""){
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