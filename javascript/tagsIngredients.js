////////////// INGREDIENTS //////////////////////////////////////////////////
/**
 * Récupère tous les ingredients de recipes
 * Fonction pour récupérer une liste d'ingrédients à partir d'une liste de recettes, en excluant ceux déjà sélectionnés.
 * Cette fonction parcourt la liste des recettes et extrait les ingrédients de chaque recette, puis exclut ceux qui sont déjà sélectionnés. Enfin, elle trie la liste d'ingrédients par ordre alphabétique en tenant compte des accents.
 * @param {Object[]} recipes - Liste des recettes à partir desquelles extraire les ingrédients.
 * @returns {string[]} - sortedIngredients - Liste des ingrédients triés par ordre alphabétique et prêts à être affichés.
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
}

/**
 * permet de filtrer les ingrédients par rapport à ce qui est tapé dans la barre de recherche du dropdown
 * Fonction pour filtrer les ingrédients dans une liste en fonction de la saisie de l'utilisateur.
 * Cette fonction réinitialise d'abord la barre de recherche des ingrédients. Ensuite, elle écoute les événements de saisie dans la barre de recherche et filtre la liste des ingrédients en fonction du terme de recherche.
 * @function filterIngredients
 * @returns {void}
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
            }
        });
    });
}

/**
 * Affiche les tags ingredients
 *  * Fonction pour afficher les tags d'ingrédients dans un menu déroulant.
 * Cette fonction prend une liste d'ingrédients et les affiche dans un menu déroulant. Elle permet également d'ajouter des tags d'ingrédients sélectionnés à une liste.
 * @param {string[]} ingredientsList - Liste des ingrédients à afficher.
 * @returns {void}
 */
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
}