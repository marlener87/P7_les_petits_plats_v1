///////////////////////////////// USTENSILES /////////////////////////////////////////
/**
 * Récupère tous les ustensiles de recipes
 */
function getUstensilesList(recipes) {
    const ustensilesList = new Set();
    
    // Récupération des ustensiles
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensile => {
            ustensilesList.add(ustensile.toLowerCase());
        });
    });

    // Suppression des ustensiles déjà sélectionnés
    const selectedTagUstensils = document.querySelectorAll("#selectedUstensilsList li");
    selectedTagUstensils.forEach(tag => {
        ustensilesList.delete(tag.innerText.toLowerCase());
    });

    // tri par ordre alphabétique en prenant en compte les accents
    const sortedUstensils = Array.from(ustensilesList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    });
    return sortedUstensils;
}; 

/**
 * permet de filtrer les ustensiles par rapport à ce qui est tapé dans la barre de recherche du dropdown
 */
function filterUstensils() {
    // Réinitialisation de l'affichage des ustensiles tags
    searchInputUstensils.value = '';

    const searchBar = document.getElementById('searchInputUstensils');
    const ustensilsList = ustensilesListDom.querySelectorAll('li');

    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();

        ustensilsList.forEach(ustensil => {
            const text = ustensil.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                ustensil.style.display = 'block';
            } else {
                ustensil.style.display = 'none';
            };
        });
    });
};

/**
 * Affiche les tags ustensiles
 */
function displayUstensilesTags(ustensilesList) {
    // Réinitialisation de l'affichage des ustensiles tags
    ustensilesListDom.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add("menu");

    // Ajouter chaque ustensiles comme un élément de liste (li)
    ustensilesList.forEach(ustensileText => {
        // Création de l'ustensile à ajouter dans le dropdown
        const newNode = document.createElement("li");
        newNode.classList.add("menu__item");
        newNode.innerHTML = ustensileText;
        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);

        /**
         * Clic sur un ustensile dans le dropdown
         */
        newNode.addEventListener('click', () => {
            const selectedUstensilsList = document.getElementById("selectedUstensilsList");

            // Création du nouveau tag
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");

            // mettre à jour la valeur de la liste avec l'ustensile sélectionné
            newSelectedItem.innerHTML = `
                ${ustensileText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `;
            selectedUstensilsList.appendChild(newSelectedItem);

            // Lancement du tri car modification de la liste de tags
            startSortRecipes();

            // pour enlever un tag
            const removeItem = newSelectedItem.querySelector(".btnCancel");

            // CHEVRON
            const list = ustensilesListDom.closest(".list");
            const chevron = ustensilesListDom.closest('.dropdown').querySelector(".fa-chevron-down");
            // CHEVRON
            list.classList.remove("list-open");
            chevron.classList.remove("fa-chevron-down-rotate");

            /**
             * Suppression du tag
             */
            removeItem.addEventListener('click', () => {
                newSelectedItem.remove();
                insertSortedNode(menuNode, newNode);

                // Lancement du trie car modification de la liste de tags
                startSortRecipes();
            });

        });
    });
    ustensilesListDom.appendChild(menuNode);
    // filtre des ustensiles en fonction de la barre de recherche du dropdown
    filterUstensils();
};