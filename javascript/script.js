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
const formDOM = document.querySelector("#searchForm"); // barre de recherche
const inputSearchDOM = document.querySelector("#searchInput");
const searchInputIngredients = document.querySelector("#searchInputIngredients");
const searchInputAppliances = document.querySelector("#searchInputAppliances");
const searchInputUstensils = document.querySelector("#searchInputUstensils");


/**
 * Récupère les données dans le fichier recipes.json
 * Fonction asynchrone pour récupérer la liste des recettes à partir d'un fichier JSON.
 * Cette fonction effectue une requête fetch pour récupérer les données à partir du fichier JSON spécifié. Elle retourne une promesse qui sera résolue avec la liste des recettes une fois qu'elles auront été récupérées et analysées.
 * @async
 * @function getRecipes
 * @returns {Promise<Object[]>} - Une promesse qui sera résolue avec la liste des recettes.
 */
async function getRecipes() {
   return await fetch("./javascript/recipes.json").then((res) => {
        return res.json();
    })
    .then(data => {
        return data.recipes;
    });
}

/**
 * Ajoute dans le DOM toutes les recettes reçues en paramètre
 * Fonction pour afficher les recettes dans l'interface utilisateur.
 * Cette fonction prend une liste de recettes et les affiche dans l'interface utilisateur sous forme de cartes.
 * @param {Object[]} listRecipes - Liste des recettes à afficher.
 * @returns {void}
 */
function displayRecipes(listRecipes) {
    // Réinitialise l'affichage de la liste des recettes
    recipesDOM.innerHTML = '';

    if (listRecipes.length === 0) {
        recipesDOM.innerHTML = `Aucune recette ne correspond à '${inputSearchDOM.value}'.`
    }

    // On parcourt la liste des recettes reçues en paramètre
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
                <img src="assets/imgRecettes/${item.image}" alt="${item.image}" class="imgRecipe">
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
}

/**
* Affiche dans le DOM le nombre de recettes
* Fonction pour afficher le nombre total de recettes affichées dans l'interface utilisateur.
 * Cette fonction compte le nombre total de cartes de recettes affichées dans l'interface utilisateur et met à jour l'élément DOM correspondant avec ce nombre.
* @returns {void}
*/
function displayCountTotalRecipes() {
    const displayedRecipeCards = document.querySelectorAll(".card");
    
    totalRecipesDOM.innerHTML = displayedRecipeCards.length +
        ' recette' + 
        (displayedRecipeCards.length > 1 ? 's' : '');
}

/**
 * Lance l'algorithme de tri quand on valide le formulaire
 * Écouteur d'événement pour la soumission du formulaire.
 * Empêche le comportement par défaut du formulaire, puis démarre le processus de tri des recettes.
 * @param {Event} event - L'événement de soumission du formulaire.
 * @returns {void}
 */
formDOM.addEventListener('submit',(event) => {
    event.preventDefault();
    startSortRecipes();
});

/**
 * Écouteur d'événement pour la saisie dans la barre de recherche.
 * Démarre le processus de tri des recettes à chaque saisie dans la barre de recherche.
 * @returns {void}
 */
inputSearchDOM.addEventListener('keyup', () => {
    startSortRecipes();
});

/**
 * voir les fichiers js tagsIngredients, tagsAppareils et tagsUstensiles
 * Fonction qui récupère toutes les recettes, les trie en fonction des tags sélectionnés
 * Fonction asynchrone pour démarrer le processus de tri et d'affichage des recettes.
 * Cette fonction récupère toutes les recettes à partir du fichier JSON, trie les recettes, affiche les tags d'ingrédients, d'appareils et d'ustensiles, puis affiche les recettes triées dans l'interface utilisateur.
 * @async
 * @function startSortRecipes
 * @returns {void}
 */
async function startSortRecipes() {
    // Récupération de toutes les recettes dans le fichier .json
    const listRecipes = await getRecipes();
    
    // Tri des recettes avec l'algorithme
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
}

/**
 * voir sortRecipesBy.js
 * Trie les recettes
 * Fonction pour trier les recettes en utilisant différents critères.
 * Cette fonction prend une liste de recettes et les trie successivement en utilisant les critères de recherche, d'ingrédients, d'appareils et d'ustensiles.
 * @param {Object[]} recipes - Liste des recettes à trier.
 * @returns {Object[]} - recipesA4 - Liste des recettes triées.
 */
function sortRecipes(recipes) {
    const recipesA1 = sortRecipesBySearch(recipes);
    const recipesA2 = sortRecipesByIngredients(recipesA1);
    const recipesA3 = sortRecipesByAppareils(recipesA2); 
    const recipesA4 = sortRecipesByUstensiles(recipesA3);

    return recipesA4;
}

/**
 * fonction pour réinsérer les tags supprimés, et les trier par ordre alphabétique
 * Fonction pour insérer un nouveau nœud dans un élément de menu trié.
 * Cette fonction prend un élément de menu existant et un nouveau nœud à insérer, puis insère le nouveau nœud dans l'élément de menu de manière triée en fonction du texte des nœuds.
 * @param {HTMLElement} menuNode - L'élément de menu dans lequel le nouveau nœud doit être inséré.
 * @param {HTMLElement} newNode - Le nouveau nœud à insérer dans l'élément de menu.
 * @returns {void}
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

/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 * Fonction d'initialisation de l'application.
 * Cette fonction démarre le processus de tri des recettes au chargement de l'application.
 * @async
 * @function init
 * @returns {void}
 */
async function init(){
    startSortRecipes();
}

init();