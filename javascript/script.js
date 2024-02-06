// Partie recettes
const recipesDOM = document.querySelector(".cardsRecipe");
const totalRecipesDOM = document.querySelector(".totalRecipes");

const ingredientsListDOM = document.getElementById("ingredients");
const selectedIngredientsList = document.getElementById("selectedIngredientsList");
const appliancesListDOM = document.getElementById("appareils");
const selectedAppliancesList = document.getElementById("selectedAppliancesList");
const ustensilesListDom = document.getElementById("ustensiles");
const selectedUstensilsList = document.getElementById("selectedUstensilsList");

// Partie formulaire
const formDOM = document.querySelector('#searchForm');
const inputSearchDOM = document.querySelector('#searchInput');


/**
 * Récupère les données dans le fichier recipes.json
 * @returns Liste des recettes 
 */
async function getRecipes() {
   return await fetch("/javascript/recipes.json").then((res) => {
        return res.json();
    })
    .then(data => {
        return data.recipes
    });
};

/**
 * Ajoute dans le DOM toutes les recettes reçues en paramètre
 * @params {object} listRecipes - La liste des recettes à afficher 
 */
function displayRecipes(listRecipes) {
    // Réinitialise l'affichage de la liste des recettes
    recipesDOM.innerHTML = '';

    // On parcourt la liste des recettes reçue en paramètre
    for (let i = 0; i < listRecipes.length; i++) {
        const item = listRecipes[i]; // On récupère la recette courante

        // On crée le nouveau noeud correspondant à la carte d'une recette
        const divCard = document.createElement("a");
        divCard.classList.add("card");
        divCard.setAttribute("href", "#");
    
        // On crée la partie ingredient de la recette
        const divBlockIngredient = document.createElement("div");
        divBlockIngredient.classList.add("blockIngredient");
    
        for (let j = 0; j < item.ingredients.length; j++) {
            const ingredient = item.ingredients[j];
            const divIngredients = document.createElement("div");
            divIngredients.classList.add("ingredientQuantite");
    
            const nomIngredient = ingredient.ingredient;
            const quantity = ingredient.quantity || '';
            const unite = ingredient.unit || '';
    
            divIngredients.innerHTML = `
                <h4 class="nameIngredient">${nomIngredient}</h4>
                <p class="quantiteIngredient">${quantity} ${unite}</p>
            `;
    
            divBlockIngredient.appendChild(divIngredients);
        }
    
        // On complète le contenu du noeud de la recette
        divCard.innerHTML = `
            <div class="cardImg">
                <img src="assets/imgRecettes/${item.image}" alt="limonade" class="imgRecipe">
                <div class="timeRecipe">
                    <span class="time">${item.time} min</span>
                </div>
            </div>
            <div class="cardBody">
                <div class="blockTitleRecipe">
                    <h2 class="nameRecipe">${item.name}</h2>
                </div>
    
                <div class="blockProcessRecipe">
                    <h3 class="titleRecipe">RECETTE</h3>
                    <p class="processRecipe">${item.description}</p>
                </div>
    
                <div class="blockIngredientsRecipe">
                    <h3 class="titleIngredient">INGRÉDIENTS</h3>
                    ${divBlockIngredient.outerHTML}
                </div>
            </div>
        `;
  
        // On ajoute le nouveau noeud de la recette dans le DOM
        recipesDOM.appendChild(divCard);
    }
}

/**
* Affiche dans le DOM le nombre de recettes
*/
function displayCountTotalRecipes() {
    const displayedRecipeCards = document.querySelectorAll(".card");
    
    totalRecipesDOM.innerHTML = displayedRecipeCards.length +
        ' recette' + 
        (displayedRecipeCards.length > 1 ? 's' : '');
}

/**
 * Lance l'algorithme de tri quand on valide le formulaire
 */
formDOM.addEventListener('submit',(event) => {
    event.preventDefault();
    
    startSortRecipes()
})

/**
 * 
 */
async function startSortRecipes(){
    // Récupération de toutes les recettes dans le fichier .json
    const listRecipes = await getRecipes();
    
    // Tri des recettes avec l'algorithme custom
    const recipesA4 = sortRecipes(listRecipes)
    
    // Affichage tags ingrédients
    const ingredientsList = getIngredientsList(recipesA4)
    displayIngredientsTags(ingredientsList)

    // Affichage tags appareils
    const appliancesList = getAppliancesList(recipesA4)
    displayAppliancesTags(appliancesList)

    // Affichage tags ustensiles
    const ustensilesList = getUstensilesList(recipesA4)
    displayUstensilesTags(ustensilesList)

    // Il faut afficher recipesA4
    displayRecipes(recipesA4);
    displayCountTotalRecipes();
}

/**
 * Trie les recettes
 *  @params recipes - Liste de toutes les recettes à trier
 */
function sortRecipes(recipes){
    const recipesA1 = sortRecipesBySearch(recipes);
    const recipesA2 = sortRecipesByIngredients(recipesA1) 
    const recipesA3 = sortRecipesByAppareils(recipesA2) 
    const recipesA4 = sortRecipesByUstensiles(recipesA3)

    //return recipesA1;
    //return recipesA2;
    //return recipesA3;
    return recipesA4;
}

/**
 * Trie les recettes via la barre de recherche
 * @params recipes - Liste de toutes les recettes à trier
 */
function sortRecipesBySearch(recipes){
    const recipesA1 = [];
    // Réinitialisation de l'affichage des tags
    //selectedIngredientsList.innerHTML = '';
    //selectedAppliancesList.innerHTML = '';
    //selectedUstensilsList.innerHTML = '';

    // Récupération du résultat de la barre de recherche
    const userSearch = inputSearchDOM.value.toLowerCase();

    // Parcours de la liste de toutes les recettes
    for(let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        // Est-ce que la recette comporte la recherche de l'utilisateur dans le titre ?
        const title = recipe.name.toLowerCase()
        if(title.includes(userSearch)) {
             // OUI : On met cette recette dans recipesA1
            recipesA1.push(recipe);    
        } else {
            console.log("non")
            // NON :
            // Est-ce que la recette comporte la recherche de l'utilisateur dans la description ?
            const description = recipe.description.toLowerCase();
            if(description.includes(userSearch)) {
                // OUI : On met cette recette dans recipesA1
                recipesA1.push(recipe);
            } else {
                // NON : 
                // Est-ce que la recette comporte la recherche dans les ingredients ?
                let ingredientFound = false;
                for(let j = 0; j < recipe.ingredients.length; j++) {
                    const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                    if (ingredient.includes(userSearch)) {
                        // OUI : On met cette recette dans recipesA1
                        recipesA1.push(recipe);
                        ingredientFound = true;
                        break; // Sortir de la boucle si un ingrédient est trouvé
                    }
                } 
            }          
        }
    }
    return recipesA1;
}

/**
 * Trie les recettes par les ingrédients sélectionnés
 * @param {*} recipes 
 * @returns 
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

        // On créer un tableau de la forme ['banane', 'mangue'] à partir de la liste des ingrédients de chaque recette
        // recipe : {
        //     ingredients : [ // recipe.ingredients
        //         {ingredient: 'Banane', quantity : 10}, // object
        //         {ingredient: 'Mangue' , quantity : 1} 
        //     ]
        // }
        const recipeIngredientsArray = recipe.ingredients.map(object => {
            return object.ingredient.toLowerCase();
        }); // => ['banane', 'mangue']

        // Every retourne Vrai si tous les elements du tableau tagsIngredientsSelected respectent la condition recipeIngredientsList.include(tag)
        if(tagsIngredientsSelected.every(tag => recipeIngredientsArray.includes(tag))){
            recipesA2.add(recipe);
        };
    });
          
    return Array.from(recipesA2); // Transformation du Set en Tableau
}

/**
 * Trie les recettes par les appareils sélectionnés
 * @param {*} recipes 
 * @returns recipesA3 - liste des recettes correspondant aux appareils sélectionnés
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
            recipesA3.add(recipe)
        };
    });
    return Array.from(recipesA3); // Transformation du Set en Tableau
}

/**
 * Trie les recettes par les ustensiles sélectionnés
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
        };
    });
    return Array.from(recipesA4); // Transformation du Set en Tableau
}

/**
 * fonction pour réinsérer les tags supprimés, et les trier par ordre alphabétique
 * @param {*} menuNode 
 * @param {*} newNode 
 */
function insertSortedNode(menuNode, newNode) {
    const nodes = menuNode.childNodes;
    let index = 0;

    // Trouver l'index d'insertion en comparant les textes des nœuds
    while (index < nodes.length && nodes[index].innerText.toLowerCase() < newNode.innerText.toLowerCase()) {
        index++;
    }

    // Insérer le nouvel élément à l'index trouvé
    if (index === nodes.length) {
        menuNode.appendChild(newNode);
    } else {
        menuNode.insertBefore(newNode, nodes[index]);
    }
}


////////////// INGREDIENTS //////////////////////////////////////////////////
/**
 * Récupère tous les ingredients de recipes
 */
function getIngredientsList(recipes){
    console.log(recipes);
    const ingredientsList = new Set();

    // Récupération des ingrédients
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.add(ingredient.ingredient.toLowerCase());
        }); 
    });
    
    // tri par ordre alphabétique en prenant en compte les accents
    const sortedIngredients = Array.from(ingredientsList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    })
    return sortedIngredients;
}

/** 
 * Affiche les tags ingredients
 **/
function displayIngredientsTags(ingredientsList){
    // Réinitialisation de l'affichage des ingrédients tags
    ingredientsListDOM.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add("menu");

    // Ajouter chaque ingrédient comme un élément de liste (li)
    ingredientsList.forEach(ingredientText => {
        const newNode = document.createElement("li");
        newNode.classList.add("menu__item");
        newNode.innerHTML = ingredientText;

        newNode.addEventListener('click', () => { 
            // newNode.remove();
            const selectedIngredientsList = document.getElementById("selectedIngredientsList");
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");
            console.log('click sur ingredient', ingredientText);

            // mettre à jour la valeur de la liste avec l'ingrédient sélectionné
            newSelectedItem.innerHTML = `
                ${ingredientText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `;
            //newSelectedItem.textContent = ingredientText;

            // pour enlever un tag
            const removeItem = newSelectedItem.querySelector(".btnCancel");
            removeItem.addEventListener('click', () => {
                newSelectedItem.remove();
                console.log('suppression de ', ingredientText);
                insertSortedNode(menuNode, newNode);
            });

            selectedIngredientsList.appendChild(newSelectedItem);

            newNode.remove();
        });

        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);
    });

    ingredientsListDOM.appendChild(menuNode);
}

//////////////////////// APPAREILS //////////////////////////////////////////////////
/**
 * Récupère tous les appareils de recipes
 */
function getAppliancesList(recipes){
    const appliancesList = new Set();

    // Récupération des appareils
    recipes.forEach(recipe => {
        appliancesList.add(recipe.appliance.toLowerCase()); 
    });

    // tri par ordre alphabétique en prenant en compte les accents
    const sortedAppliances = Array.from(appliancesList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    });
    return sortedAppliances;
}

/** 
 * Affiche les tags appareils
 **/
function displayAppliancesTags(appliancesList){
    // Réinitialisation de l'affichage des appareils tags
    appliancesListDOM.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add('menu');

    // Ajouter chaque appareil comme un élément de liste (li)
    appliancesList.forEach(applianceText => {
        const newNode = document.createElement("li");
        newNode.classList.add('menu__item')
        newNode.innerHTML = applianceText;

        newNode.addEventListener('click', () => {
            //newNode.remove();
            const selectedAppliancesList = document.getElementById("selectedAppliancesList");
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");
            console.log('click sur appareil', applianceText);

            // mettre à jour la valeur de la liste avec l'appareil sélectionné
            newSelectedItem.innerHTML = `
                ${applianceText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `;
            //newSelectedItem.textContent = applianceText;

            // pour enlever un tag
            const removeItem = newSelectedItem.querySelector(".btnCancel");
            removeItem.addEventListener('click', () => {
                newSelectedItem.remove();
                insertSortedNode(menuNode, newNode);
            });

            selectedAppliancesList.appendChild(newSelectedItem);

            newNode.remove();
        })

        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);
    });

    appliancesListDOM.appendChild(menuNode);
}


///////////////////////////////// USTENSILES /////////////////////////////////////////
/**
 * Récupère tous les ustensiles de recipes
 */
function getUstensilesList(recipes){
    const ustensilesList = new Set();
    
    // Récupération des ustensiles
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensile => {
            ustensilesList.add(ustensile.toLowerCase());
        });
    });

    // tri par ordre alphabétique en prenant en compte les accents
    const sortedUstensils = Array.from(ustensilesList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    })
    return sortedUstensils;
}

/**
 * Affiche les tags ustensiles
 */
function displayUstensilesTags(ustensilesList){
    // Réinitialisation de l'affichage des ustensiles tags
    ustensilesListDom.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add("menu");

    // Ajouter chaque ustensiles comme un élément de liste (li)
    ustensilesList.forEach(ustensileText => {
        const newNode = document.createElement("li");
        newNode.classList.add("menu__item");
        newNode.innerHTML = ustensileText;

        newNode.addEventListener('click', () => {
            //newNode.remove();
            const selectedUstensilsList = document.getElementById("selectedUstensilsList");
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");
            console.log('click sur ustensile', ustensileText);

            // mettre à jour la valeur de la liste avec l'ustensile sélectionné
            newSelectedItem.innerHTML = `
                ${ustensileText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `
            //newSelectedItem.textContent = ustensileText;

            // pour enlever un tag
            const removeItem = newSelectedItem.querySelector(".btnCancel");
            removeItem.addEventListener('click', () => {
                newSelectedItem.remove();
                insertSortedNode(menuNode, newNode);
            });

            selectedUstensilsList.appendChild(newSelectedItem);

            newNode.remove();
        });

        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);
    });

    ustensilesListDom.appendChild(menuNode);
}


////////////////////////////// BARRE DE RECHERCHE DES TAGS /////////////////////////////////
// document.getElementById('searchInput').addEventListener('input', function() {
//     const searchValue = this.value.toLowerCase();
//     const listItems = document.querySelectorAll('.menu li');
  
//     listItems.forEach(function(item) {
//         const text = item.textContent.toLowerCase();
//         if (text.includes(searchValue)) {
//             item.style.display = 'list-item'; // Afficher l'élément s'il correspond à la recherche
//         } else {
//             item.style.display = 'none'; // Masquer l'élément s'il ne correspond pas à la recherche
//         }
//     });
// });
// const searchInputTag = document.querySelector('#searchInput');
// const searchResult = document.querySelector('.table_results');
// let dataArray;

// function filterTags(e) {
//     searchResult.innerHTML = "";
//     const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

//     const filteredArray = dataArray.filter(el => 
//         el.ingredients.ingredient.toLowerCase().includes(searchedString)
//     );

//     displayIngredientsTags(filteredArray);
// }

// searchInputTag.addEventListener("input", filterTags);
















/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 */
async function init() {

    startSortRecipes();

    // Récupération des recettes
    //const listRecipes = await getRecipes();
    
    // Affichage tags ingrédients
    //const ingredientsList = getIngredientsList(listRecipes);
    //displayIngredientsTags(ingredientsList);

    // Affichage tags appareils
    //const appliancesList = getAppliancesList(listRecipes);
    //displayAppliancesTags(appliancesList);
    // const appliancesList = new Set();

    // listRecipes.forEach(recipe => {
    //     appliancesList.add(recipe.appliance)
    // })
    //console.log(appliancesList)


    // Affichage tags ustensiles
    //const ustensilesList = getUstensilesList(listRecipes);
    //displayUstensilesTags(ustensilesList);
    // const ustensilesList = new Set();

    // listRecipes.forEach(recipe => {
    //     recipe.ustensils.forEach(ustensil => {
    //         ustensilesList.add(ustensil)
    //     })
    // })
    //console.log(ustensilesList)


    // Affichage des recettes
    //displayRecipes(listRecipes);
    //displayCountTotalRecipes();
};

init();


/**
 * ROADMAP: 
 * - * Terminer l'algorigramme 
 * 
 * - * Réaliser lalgorithme sur la barre de recherche : sortRecipesBySearch
 * - * Modifier l'affichage des recettes dans le DOM une fois que l'algorithme de trie a été effectué
 * 
 * - Remplir dynamiquement les dropdowns filtres avec les bonnes informations
 * - Réaliser les algorithmes de tri sortRecipesByIngredients, sortRecipesByAppareils, sortRecipesByUstensiles
 * 
 * - Améliorer les dropdowns : 
 *      - N'afficher que les informations des recettes qui matchent
 *      - L'input de recherche dans les dropdown 
 * 
 * - Terminer la fiche d'investigation
 * 
 * - Sur une autre branche de git, remplacer toutes les boucles for par des boucles map
 * - Faire le benchmark de différences de performences entre les algo
 */

