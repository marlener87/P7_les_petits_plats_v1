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
//     const divIngredients = document.createElement("div");
//     divIngredients.classList.add("ingredientQuantite");

//     let ingredientName;

//     for(const ingredient of ingredients) {
//         ingredientName = document.createElement("h4");
//         ingredientName.classList.add("nameIngredient");
//         if(ingredient.unit === '' || ingredient.unit === null) {
//             ingredientName.innerHTML = `
//                 ${item.ingredients[0].ingredient} : ${item.ingredients[].quantity}
//             `
//         } else {
//             ingredientName.innerHTML = `
//             ${item.ingredients[0].ingredient} : ${item.ingredients[].quantity} ${item.ingredients[].unit}`
//         }
//     divIngredients.appendChild(ingredientName);
//     }
//     return divIngredients
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


        if((recipes.ingredients)) {
            recipes.ingredients.forEach(ingredient => {
                console.log(`ingredient : ${ingredient}`)
            })
        } else {
            console.log('erreur');
        }
        // const divIngredients = document.createElement("div");
        // divIngredients.classList.add("ingredientQuantite");

        // let ingredientName;

        // for(const ingredient of ingredients) {
        //     ingredientName = document.createElement("h4");
        //     ingredientName.classList.add("nameIngredient");
        //     if(ingredient.unit === '' || ingredient.unit === null) {
        //         ingredientName.innerHTML = `
        //             ${item.ingredients[0].ingredient} : ${item.ingredients.quantity}
        //         `
        //     } else {
        //         ingredientName.innerHTML = `
        //         ${item.ingredients[0].ingredient} : ${item.ingredients.quantity} ${item.ingredients.unit}`
        //     }
        // divIngredients.appendChild(ingredientName);
        // }

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
                    <div class="blockIngredient">
                        <div class="ingredientQuantite">
                            <h4 class="nameIngredient">${item.ingredients[0].ingredient}</h4>
                            <p class="quantiteIngredient">${item.ingredients[0].quantity} ${item.ingredients[0].unit}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        /* */
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
    // getIngredients(listRecipes);
};

init();