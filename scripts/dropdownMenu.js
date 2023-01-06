function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')){
            openDropdown.classList.remove('show');
        }
    }
}
} 

const dropdown = document.querySelector("#myDropdown");
const headers = dropdown.querySelectorAll("h1");


headers.forEach(header =>{
    header.addEventListener("click", () =>{
        if(header.textContent === "sort alphabetically"){
            favoriteHeader.style.visibility = "visible";
            favoriteItemsStored.sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            
            removeFavoriteList();
            showFavoriteItems();
        }
        else{
            console.log('o');
        }
    })
});