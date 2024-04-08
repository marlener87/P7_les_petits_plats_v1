/**
 * Trie les recettes via la barre de recherche
 * Fonction pour filtrer les recettes en fonction de la recherche de l'utilisateur.
 * Cette fonction prend une liste de recettes et filtre les recettes en fonction de la recherche de l'utilisateur. La recherche peut être basée sur le titre de la recette, sa description ou ses ingrédients.
 * @param {Object[]} recipes - Liste des recettes à filtrer.
 * @returns {Object[]} - recipesA1 - Liste des recettes filtrées en fonction de la recherche de l'utilisateur.
 */
function sortRecipesBySearch(recipes) {
    const recipesA1 = [];

    // Récupération du résultat de la barre de recherche
    const userSearch = inputSearchDOM.value.toLowerCase();
    if(userSearch.length < 3) return recipes;

    // Parcours de la liste de toutes les recettes
    recipes.forEach(recipe => {
        // Est-ce que la recette comporte la recherche de l'utilisateur dans le titre ?
        const title = recipe.name.toLowerCase();
        if(title.includes(userSearch)) {
             // OUI : On met cette recette dans recipesA1
            recipesA1.push(recipe);    
        } else {
            // NON : Est-ce que la recette comporte la recherche de l'utilisateur dans la description ?
            const description = recipe.description.toLowerCase();
            if(description.includes(userSearch)) {
                // OUI : On met cette recette dans recipesA1
                recipesA1.push(recipe);
            } else {
                // NON : Est-ce que la recette comporte la recherche dans les ingredients ?
                let ingredientFound = false;
                recipe.ingredients.forEach(ingredient => {
                    const ingredientText = ingredient.ingredient.toLowerCase();
                    if (ingredientText.includes(userSearch)) {
                        // OUI : On met cette recette dans recipesA1
                        recipesA1.push(recipe);
                        ingredientFound = true;
                        return; // Sortir de la boucle si un ingrédient est trouvé
                    }
                })
            }      
        }
    })
    return recipesA1;
}

/**
 * Trie les recettes par les ingrédients sélectionnés
 * Fonction pour filtrer les recettes en fonction des ingrédients sélectionnés.
 * Cette fonction prend une liste de recettes et filtre les recettes en fonction des ingrédients sélectionnés par l'utilisateur.
 * @param {Object[]} recipes - Liste des recettes à filtrer.
 * @returns {Object[]} - Liste des recettes filtrées en fonction des ingrédients sélectionnés.
 */
function sortRecipesByIngredients(recipes) {
    const recipesA2 = new Set(); // Set : pour éviter les doublons de recettes

    const tagsIngredientsSelected = []; // Initialisation du tableau des tags ingredients selectionnés

    // On récupère tous les tags selectionnés
    const itemNodes = document.querySelectorAll('#selectedIngredientsList li'); // retourne une NodeList
    itemNodes.forEach(node => {
        tagsIngredientsSelected.push(node.innerText); // On remplit TagsIngredientsSelected
    });

    if(tagsIngredientsSelected.length < 1) return recipes;

    recipes.forEach(recipe => { // Parcourt de toutes les recettes
        // On crée un tableau de la forme ['banane', 'mangue'] à partir de la liste des ingrédients de chaque recette
        // recipe : {
        //     ingredients : [ // recipe.ingredients
        //         {ingredient: 'Banane', quantity : 10}, // object
        //         {ingredient: 'Mangue' , quantity : 1} 
        // ]}
        const recipeIngredientsArray = recipe.ingredients.map(object => {
            return object.ingredient.toLowerCase();
        }); // => ['banane', 'mangue']

        // Every retourne Vrai si tous les elements du tableau tagsIngredientsSelected respectent la condition recipeIngredientsList.include(tag)
        if(tagsIngredientsSelected.every(tag => recipeIngredientsArray.includes(tag))) {
            recipesA2.add(recipe);
        }
    });      
    return Array.from(recipesA2); // Transformation du Set en Tableau
}

/**
 * Trie les recettes par les appareils sélectionnés
 * Fonction pour filtrer les recettes en fonction des appareils sélectionnés.
 * Cette fonction prend une liste de recettes et filtre les recettes en fonction des appareils sélectionnés par l'utilisateur.
 * @param {Object[]} recipes - Liste des recettes à filtrer.
 * @returns {Object[]} - Liste des recettes filtrées en fonction des appareils sélectionnés.
 */
function sortRecipesByAppareils(recipes) {
    const recipesA3 = new Set(); // Set : pour éviter les doublons de recettes
    const tagsAppliancesSelected = []; // Initialisation du tableau des tags appareils selectionnés
    const itemNodes = document.querySelectorAll('#selectedAppliancesList li'); // On récupère tous les tags selectionnés

    itemNodes.forEach(node => {
        tagsAppliancesSelected.push(node.innerText.toLowerCase()); // On remplit tagsAppliancesSelected
    });

    if(tagsAppliancesSelected.length < 1) return recipes;
    
    recipes.forEach(recipe => { // Parcourt de toutes les recettes
        const recipeAppliance = recipe.appliance.toLowerCase();

        if(tagsAppliancesSelected.includes(recipeAppliance)) {
            recipesA3.add(recipe);
        }
    });
    return Array.from(recipesA3); // Transformation du Set en Tableau
}

/**
 * Trie les recettes par les ustensiles sélectionnés
 * Fonction pour filtrer les recettes en fonction des ustensiles sélectionnés.
 * Cette fonction prend une liste de recettes et filtre les recettes en fonction des ustensiles sélectionnés par l'utilisateur.
 * @param {Object[]} recipes - Liste des recettes à filtrer.
 * @returns {Object[]} - Liste des recettes filtrées en fonction des ustensiles sélectionnés.
 */
function sortRecipesByUstensiles(recipes) {
    const recipesA4 = new Set(); // Set : pour éviter les doublons de recettes
    const tagsUstensilsSelected = []; // Initialisation du tableau des tags ustensiles selectionnés
    const itemNodes = document.querySelectorAll('#selectedUstensilsList li'); // On récupère tous les tags selectionnés

    itemNodes.forEach(node => {
        tagsUstensilsSelected.push(node.innerText); // On remplit tagsUstensilsSelected
    });

    if(tagsUstensilsSelected.length < 1) return recipes;

    recipes.forEach(recipe => { // Parcourt de toutes les recettes
        const recipeUstensilsArray = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        
        if(tagsUstensilsSelected.every(tag => recipeUstensilsArray.includes(tag))) {
            recipesA4.add(recipe);
        }
    });
    return Array.from(recipesA4); // Transformation du Set en Tableau
}