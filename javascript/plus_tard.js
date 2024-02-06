// function getIngredients(ingredients) {
//     ingredients.recipes[0].ingredients.forEach(ingredient => {
//         const divIngredients = document.createElement("div");

//         const nomIngredient = ingredient.ingredient;
//         const quantity = ingredient.quantity;
//         const unite = ingredient.unit || '';

//         divIngredients.innerHTML = `
//         <div class="ingredientQuantite">
//             <h4 class="nameIngredient">${nomIngredient}</h4>
//             <p class="quantiteIngredient">${quantity} ${unite}</p>
//         </div>
//         `
//         recipes.appendChild(divIngredients)
//     }) 
// }

/* FUNCTION FOREACH */
/**
 * fonction qui va créer la carte de la recette, avec le titre, la photo, les ingrédients, le processus...
 */
/* paramètre : , ingredients */
// function displayRecipes(objectRecipes) {
//     console.log('coucou');
//     objectRecipes.recipes.forEach((item) => {
//         const divCard = document.createElement("a");
//         divCard.classList.add("card");

//         const divBlockIngredient = document.createElement("div");
//         divBlockIngredient.classList.add("blockIngredient");

//         /* boucle pour avoir tous les ingrédients d'une recette ainsi que sa quantité et son unité */
//         item.ingredients.forEach(ingredient => {
//             const divIngredients = document.createElement("div");
//             divIngredients.classList.add("ingredientQuantite");

//             const nomIngredient = ingredient.ingredient;
//             const quantity = ingredient.quantity || '';
//             const unite = ingredient.unit || '';

//             divIngredients.innerHTML = `
//                     <h4 class="nameIngredient">${nomIngredient}</h4>
//                     <p class="quantiteIngredient">${quantity} ${unite}</p>
//             `;
//             //console.log(divIngredients);
//             divBlockIngredient.appendChild(divIngredients);
//         });

//         divCard.innerHTML = `
//             <div class="cardImg">
//                 <img src="assets/imgRecettes/${item.image}" alt="${item.name}" class="imgRecipe">
//                 <div class="timeRecipe">
//                     <span class="time">${item.time} min</span>
//                 </div>
//             </div>
//             <div class="cardBody">
//                 <div class="blockTitleRecipe">
//                     <h2 class="nameRecipe">${item.name}</h2>
//                 </div>

//                 <div class="blockProcessRecipe">
//                     <h3 class="titleRecipe">RECETTE</h3>
//                     <p class="processRecipe">${item.description}
//                     </p>
//                 </div>

//                 <div class="blockIngredientsRecipe">
//                     <h3 class="titleIngredient">INGRÉDIENTS</h3>
//                         ${divBlockIngredient.outerHTML}
//                 </div>
//             </div>
//         `;

//         recipes.appendChild(divCard);
//     });
// }

/* FUNCTION MAP */
// function displayRecipes(objectRecipes) {
//     console.log('coucou');
//     objectRecipes.recipes.map((item) => {
//         const divCard = document.createElement("a");
//         divCard.classList.add("card");

//         const divBlockIngredient = document.createElement("div");
//         divBlockIngredient.classList.add("blockIngredient");

//         /* boucle pour avoir tous les ingrédients d'une recette ainsi que sa quantité et son unité */
//         item.ingredients.map(ingredient => {
//             const divIngredients = document.createElement("div");
//             divIngredients.classList.add("ingredientQuantite");

//             const nomIngredient = ingredient.ingredient;
//             const quantity = ingredient.quantity || '';
//             const unite = ingredient.unit || '';

//             divIngredients.innerHTML = `
//                     <h4 class="nameIngredient">${nomIngredient}</h4>
//                     <p class="quantiteIngredient">${quantity} ${unite}</p>
//             `;
//             //console.log(divIngredients);
//             divBlockIngredient.appendChild(divIngredients);
//             return divIngredients.outerHTML;
//         }).join('');

//         divCard.innerHTML = `
//             <div class="cardImg">
//                 <img src="assets/imgRecettes/${item.image}" alt="${item.name}" class="imgRecipe">
//                 <div class="timeRecipe">
//                     <span class="time">${item.time} min</span>
//                 </div>
//             </div>
//             <div class="cardBody">
//                 <div class="blockTitleRecipe">
//                     <h2 class="nameRecipe">${item.name}</h2>
//                 </div>

//                 <div class="blockProcessRecipe">
//                     <h3 class="titleRecipe">RECETTE</h3>
//                     <p class="processRecipe">${item.description}
//                     </p>
//                 </div>

//                 <div class="blockIngredientsRecipe">
//                     <h3 class="titleIngredient">INGRÉDIENTS</h3>
//                         ${divBlockIngredient.outerHTML}
//                 </div>
//             </div>
//         `;

//         recipes.appendChild(divCard);
//         return divCard.outerHTML;
//     });
// }


/* DROPDOWN */
// const allAppareils = [];
    // const listeAppareils = document.getElementById("appareils");
    // const ulElement = document.createElement("ul");
    // ulElement.classList.add("menu");

    // Object.keys(items).forEach(key => {
    //     const item = items[key];
    //     const liElement = document.createElement("li");
    //     liElement.textContent = item.toLowerCase();

    //     ulElement.appendChild(liElement)
    // });

    // listeAppareils.appendChild(ulElement);

    // recipesA2.forEach(recipeA1 => {
    //     recipeA1.appliance.forEach(appliance => {
    //         console.log('hey');
    //         //allAppareils.push(appliance.toLowerCase());
    //         console.log(appliance);
    //     });
    // })

    // const uniqueAppareil = [... new Set(allAppareils)];

    // uniqueAppareil.forEach(appareil => {
    //     const liElement = document.createElement("li");
    //     liElement.textContent = appareil;
    //     ulElement.appendChild(liElement);
    // });

    // listeAppareils.appendChild(ulElement);
    //const allAppareils = [];






A JETER
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
    //const ingredientsList = getIngredientsList(recipes); // Obtenir la liste des ingrédients triés

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
            newNode.remove();
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
                //newNode.appendChild(newSelectedItem);
                newSelectedItem.remove();
                //menuNode.appendChild(newNode);
                //insertSortedNode(menuNode, newNode); // Réinsérer le nœud dans la liste triée
            });

            selectedIngredientsList.appendChild(newSelectedItem);
            //newNode.remove();
            
            // sortRecipesBySelectedIngredients();
        });

        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);
        
    });

    ingredientsListDOM.appendChild(menuNode);
}