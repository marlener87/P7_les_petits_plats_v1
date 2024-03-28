////////////// INGREDIENTS //////////////////////////////////////////////////
/**
 * Récupère tous les ingredients de recipes
 */
function getIngredientsList(recipes) {
    const ingredientsList = new Set();

    // Récupération des ingrédients
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.add(ingredient.ingredient.toLowerCase());
        }); 
    });
    
    // Suppression des ingredients déjà selectionnés
    const selectedTagIngredients = document.querySelectorAll("#selectedIngredientsList li");
    selectedTagIngredients.forEach(tag => {
        ingredientsList.delete(tag.innerText.toLowerCase());
    });

    // tri par ordre alphabétique en prenant en compte les accents
    const sortedIngredients = Array.from(ingredientsList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    });
    return sortedIngredients;
};

/**
 * permet de filtrer les ingrédients par rapport à ce qui est tapé dans la barre de recherche du dropdown
 */
function filterIngredients() {
    // Réinitialisation de l'affichage des ustensiles tags
    searchInputIngredients.value = '';

    const searchBar = document.getElementById("searchInputIngredients");
    const ingredientsList = ingredientsListDOM.querySelectorAll("li");

    searchBar.addEventListener("input", function() {
        const searchTerm = searchBar.value.toLowerCase();

        ingredientsList.forEach(ingredient => {
            const text = ingredient.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                ingredient.style.display = "block";
            } else {
                ingredient.style.display = "none";
            };
        });
    });
};

/** 
 * Affiche les tags ingredients
 **/
function displayIngredientsTags(ingredientsList) {
    // Réinitialisation de l'affichage des ingrédients tags
    ingredientsListDOM.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add("menu");

    // Ajouter chaque ingrédient comme un élément de liste (li)
    ingredientsList.forEach(ingredientText => {
        // Création de l'ingredient à ajouter dans le dropdown
        const newNode = document.createElement("li");
        newNode.classList.add("menu__item");
        newNode.innerHTML = ingredientText;
        menuNode.appendChild(newNode);

        /**
         * Clic sur un ingredient dans le dropdown
         */
        newNode.addEventListener('click', () => { 
            const selectedIngredientsList = document.getElementById("selectedIngredientsList");
            
            // Création du nouveau tag
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");
            newSelectedItem.innerHTML = `
                ${ingredientText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `;
            selectedIngredientsList.appendChild(newSelectedItem);

            // Lancement du tri car modification de la liste de tags
            startSortRecipes();
            
            const removeItem = newSelectedItem.querySelector(".btnCancel");

            // CHEVRON
            const list = ingredientsListDOM.closest(".list");
            const chevron = ingredientsListDOM.closest(".dropdown").querySelector('.fa-chevron-down');
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
    ingredientsListDOM.appendChild(menuNode);
    // filtre des ingrédients en fonction de la barre de recherche du dropdown
    filterIngredients();
};