//const listRecipes = require('recipes.js');
// Partie recettes
const recipesDOM = document.querySelector(".cardsRecipe");
const totalRecipesDOM = document.querySelector(".totalRecipes");

const ingredientsListDOM = document.getElementById("ingredients");
const selectedIngredientsList = document.getElementById("selectedIngredientsList");
const appliancesListDOM = document.getElementById("appareils");
const selectedAppliancesList = document.getElementById("selected'AppliancesList");
const ustensilesListDom = document.getElementById("ustensiles");
const selectedUstensilsList = document.getElementById("selectedUstensilsList");

// Partie formulaire
const formDOM = document.querySelector("#searchForm");
const inputSearchDOM = document.querySelector("#searchInput");
const searchInputIngredients = document.querySelector("#searchInputIngredients");
const searchInputAppliances = document.querySelector("#searchInputAppliances");
const searchInputUstensils = document.querySelector("#searchInputUstensils");


/**
 * Récupère les données dans le fichier recipes.json
 * @returns Liste des recettes 
 */
async function getRecipes() {
   return await fetch("/javascript/recipes.json").then((res) => {
        return res.json();
    })
    .then(data => {
        return data.recipes;
    });
};

/**
 * Ajoute dans le DOM toutes les recettes reçues en paramètre
 * @params {object} listRecipes - La liste des recettes à afficher 
 */
function displayRecipes(listRecipes) {
    // Réinitialise l'affichage de la liste des recettes
    recipesDOM.innerHTML = '';

    if (listRecipes.length === 0) {
        recipesDOM.innerHTML = `Aucune recette ne correspond à '${inputSearchDOM.value}'.`
    }

    // On parcourt la liste des recettes reçue en paramètre
    listRecipes.forEach(item => {
        // On crée le nouveau noeud correspondant à la carte d'une recette
        const divCard = document.createElement("a");
        divCard.classList.add("card");
        divCard.setAttribute("href", "#");
    
        // On crée la partie ingredient de la recette
        const divBlockIngredient = document.createElement("div");
        divBlockIngredient.classList.add("blockIngredient");
    
        item.ingredients.forEach(ingredient => {
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
        });
    
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
    });
};

/**
* Affiche dans le DOM le nombre de recettes
*/
function displayCountTotalRecipes() {
    const displayedRecipeCards = document.querySelectorAll(".card");
    
    totalRecipesDOM.innerHTML = displayedRecipeCards.length +
        ' recette' + 
        (displayedRecipeCards.length > 1 ? 's' : '');
};

/**
 * Lance l'algorithme de tri quand on valide le formulaire
 */
formDOM.addEventListener('submit',(event) => {
    event.preventDefault();
    startSortRecipes();
});

inputSearchDOM.addEventListener('keyup', () => {
    startSortRecipes();
});

/**
 * Fonction qui récupère toutes les recettes, les trie en fonction des tags sélectionnés
 */
async function startSortRecipes() {
    // Récupération de toutes les recettes dans le fichier .json
    const listRecipes = await getRecipes();
    
    // Tri des recettes avec l'algorithme custom
    const recipesA4 = sortRecipes(listRecipes);
    
    // Affichage tags ingrédients
    const ingredientsList = getIngredientsList(recipesA4);
    displayIngredientsTags(ingredientsList);

    // Affichage tags appareils
    const appliancesList = getAppliancesList(recipesA4);
    displayAppliancesTags(appliancesList);

    // Affichage tags ustensiles
    const ustensilesList = getUstensilesList(recipesA4);
    displayUstensilesTags(ustensilesList);

    // Il faut afficher recipesA4
    displayRecipes(recipesA4);
    displayCountTotalRecipes();
};

/**
 * Trie les recettes
 *  @params recipes - Liste de toutes les recettes à trier
 */
function sortRecipes(recipes) {
    const recipesA1 = sortRecipesBySearch(recipes);
    const recipesA2 = sortRecipesByIngredients(recipesA1);
    const recipesA3 = sortRecipesByAppareils(recipesA2); 
    const recipesA4 = sortRecipesByUstensiles(recipesA3);

    return recipesA4;
};

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
    };
};

/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 */
async function init(){
    startSortRecipes();
};

init();