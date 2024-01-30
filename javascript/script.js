// Partie recettes
const recipesDOM = document.querySelector(".cardsRecipe");
const totalRecipesDOM = document.querySelector(".totalRecipes");

const ingredientsListDOM = document.getElementById("ingredients");
const appliancesListDOM = document.getElementById("appareils");
const ustensilesListDom = document.getElementById("ustensiles");

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
formDOM.addEventListener('submit', async (event) => {
    event.preventDefault();

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
    console.log('recettes triées :')
    console.log(recipesA4)
    displayRecipes(recipesA4);
    displayCountTotalRecipes();
})


/**
 * Trie les recettes
 */
function sortRecipes(recipes){
    const recipesA1 = sortRecipesBySearch(recipes)
    
    //const recipesA2 = sortRecipesByIngredients(recipesA1)
    
    //const recipesA3 = sortRecipesByAppareils(recipesA2)
    
    //const recipesA4 = sortRecipesByUstensiles(recipesA3)

    return recipesA1
}

/**
 * Trie les recettes via la barre de recherche
 * @params recipes - Liste de toutes les recettes à trier
 */
function sortRecipesBySearch(recipes){
    const recipesA1 = [];

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

// /**
//  * Trie les recettes via les filtres ingredients
//  */
// // parametre : recipesA1
// function sortRecipesByIngredients(recipesA1){
//     const allIngredients = [];
//     const listeIngredients = document.getElementById("ingredients");
//     //listeIngredients.classList.add("menu");
//     const ulElement = document.createElement("ul");
//     ulElement.classList.add("menu");

//     recipesA1.forEach(recipe => {
//         recipe.ingredients.forEach(ingredient => {
//             allIngredients.push(ingredient.ingredient.toLowerCase());
//             //console.log(recipe);  
//             //console.log(ingredient);
//             //console.log(allIngredients);
//         }); 
//     });

    
//     const uniqueIngredient = [... new Set(allIngredients)];

//     // Ajouter chaque ingrédient comme un élément de liste (li)
//     uniqueIngredient.forEach(ingredient => {
//         const liElement = document.createElement("li");
//         liElement.textContent = ingredient;
//         ulElement.appendChild(liElement);
//     });
    
//     // Ajouter la liste à votre conteneur dans le DOM
//     listeIngredients.appendChild(ulElement);


//     return recipesA1;
//     //return (recipesA1, uniqueIngredient);
//     //console.log(recipesA1);
//     //console.log(uniqueIngredient);
//     //return uniqueIngredient;
// }

// /**
//  * Trie les recettes via les filtres appareils
//  */
// function sortRecipesByAppareils(recipesA2){
//     const appareilsDOM = document.querySelector("#appareils");
//     appareilsDOM.innerHTML = '';


//     for(let i = 0; i < recipesA2.length; i++) {
//         //console.log(recipesA1);
//         const recettes = recipesA2[i];
//         console.log(recettes);
//         const divDropdown = document.createElement("ul");
//         divDropdown.classList.add("menu");
//         console.log(divDropdown);

//         //for(let j = 0; j < recettes.appliance.length; j++) {
//             //const appareil = recettes.appliance[j];
//             const appareil = recettes.appliance;
//             const liElement = document.createElement("li");
//             liElement.textContent = appareil.toLowerCase();
//             divDropdown.appendChild(liElement);
//         //}
//         appareilsDOM.appendChild(divDropdown);
//     }
//     return recipesA2
// }

// /**
//  * Trie les recettes via les filtres ustensiles
//  */
// function sortRecipesByUstensiles(recipesA3){
//     const allUstensiles = [];
//     const listeUstensiles = document.getElementById("ustensiles");
//     //listeIngredients.classList.add("menu");
//     const ulElement = document.createElement("ul");
//     ulElement.classList.add("menu");

//     recipesA3.forEach(recipe => {
//         recipe.ustensiles.forEach(ustensile => {
//             allUstensiles.push(ustensile.toLowerCase());
//             //console.log(recipe);  
//             //console.log(ingredient);
//             //console.log(allIngredients);
//         }); 
//     });

//     const uniqueUstensile = [... new Set(allUstensiles)];

//     // Ajouter chaque ingrédient comme un élément de liste (li)
//     uniqueUstensile.forEach(ustensile => {
//         const liElement = document.createElement("li");
//         liElement.textContent = ustensile;
//         ulElement.appendChild(liElement);
//     });
    
//     // Ajouter la liste à votre conteneur dans le DOM
//     listeUstensiles.appendChild(ulElement);
    
//     return recipesA3
// }

////////////// INGREDIENTS
/**
 * Récupère tous les ingredients de recipes
 */
function getIngredientsList(recipes){
    const ingredientsList = new Set();

    // Récupération des ingrédients
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.add(ingredient.ingredient.toLowerCase());
        }); 
    });
    
    // tri par ordre alphabétique en prenant en compte les accents
    //const sortedIngredients = Array.from(ingredientsList).sort();
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
            console.log('click sur ingredient', ingredientText);
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
    //const sortedAppliances = Array.from(appliancesList).sort();
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
    menuNode.classList.add('menu')

        // Ajouter chaque appareil comme un élément de liste (li)
        appliancesList.forEach(applianceText => {
            const newNode = document.createElement("li");
            newNode.classList.add('menu__item')
            newNode.innerHTML = applianceText;

            newNode.addEventListener('click', () => {
                console.log('click sur appareil', applianceText);
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
    //const sortedUstensils = Array.from(ustensilesList).sort();
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
            console.log('click sur ustensile', ustensileText);
        });

        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);
    });

    ustensilesListDom.appendChild(menuNode);
}



















/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 */
async function init() {

    // Récupération des recettes
    const listRecipes = await getRecipes();
    
    // Affichage tags ingrédients
    const ingredientsList = getIngredientsList(listRecipes);
    displayIngredientsTags(ingredientsList);

    // Affichage tags appareils
    const appliancesList = getAppliancesList(listRecipes);
    displayAppliancesTags(appliancesList);
    // const appliancesList = new Set();

    // listRecipes.forEach(recipe => {
    //     appliancesList.add(recipe.appliance)
    // })

    console.log(appliancesList)


    // Affichage tags ustensiles
    const ustensilesList = getUstensilesList(listRecipes);
    displayUstensilesTags(ustensilesList);
    // const ustensilesList = new Set();

    // listRecipes.forEach(recipe => {
    //     recipe.ustensils.forEach(ustensil => {
    //         ustensilesList.add(ustensil)
    //     })
    // })
    console.log(ustensilesList)


    // Affichage des recettes
    displayRecipes(listRecipes);
    displayCountTotalRecipes();
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

