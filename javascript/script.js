const recipes = document.querySelector(".cardsRecipe");

/**
 * function qui va chercher les données dans le fichier .json
 * @returns result
 */
async function getRecipes() {
    const result = await fetch("/javascript/recipes.json").then((res) => {
        return res.json();
    });

    return result
};

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

/**
 * fonction qui va créer la carte de la recette, avec le titre, la photo, les ingrédients, le processus...
 */
/* paramètre : , ingredients */
function displayRecipes(objectRecipes) {
    console.log('coucou');
    objectRecipes.recipes.forEach((item) => {
        const divCard = document.createElement("a");
        divCard.classList.add("card");

        const divBlockIngredient = document.createElement("div");
        divBlockIngredient.classList.add("blockIngredient");

        /* boucle pour avoir tous les ingrédients d'une recette ainsi que sa quantité et son unité */
        item.ingredients.forEach(ingredient => {
            const divIngredients = document.createElement("div");
            divIngredients.classList.add("ingredientQuantite");

            const nomIngredient = ingredient.ingredient;
            const quantity = ingredient.quantity || '';
            const unite = ingredient.unit || '';

            divIngredients.innerHTML = `
                    <h4 class="nameIngredient">${nomIngredient}</h4>
                    <p class="quantiteIngredient">${quantity} ${unite}</p>
            `
            //console.log(divIngredients);
            divBlockIngredient.appendChild(divIngredients);
        });

        

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
                    <p class="processRecipe">${item.description}
                    </p>
                </div>

                <div class="blockIngredientsRecipe">
                    <h3 class="titleIngredient">INGRÉDIENTS</h3>
                        ${divBlockIngredient.outerHTML}
                </div>
            </div>
        `;

        /* <div class="blockIngredient">

                    </div><div class="ingredientQuantite">
                            <h4 class="nameIngredient">${nomIngredient}</h4>
                            <p class="quantiteIngredient">${quantity} ${unite}</p>
                        </div> */
        /*${ingredientName} */ 
        recipes.appendChild(divCard);
    });

}


/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 */
async function init() {
    const listRecipes = await getRecipes();
    displayRecipes(listRecipes);
    //getIngredients(listRecipes);
};

init();