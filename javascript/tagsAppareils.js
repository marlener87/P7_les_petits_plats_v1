//////////////////////// APPAREILS //////////////////////////////////////////////////
/**
 * Récupère tous les appareils de recipes
 * @param {string} recipes 
 * @returns sortedAppliances retourne les appareils triés par ordre alphabétique
 */
function getAppliancesList(recipes) {
    const appliancesList = new Set();

    // Récupération des appareils
    recipes.forEach(recipe => {
        appliancesList.add(recipe.appliance.toLowerCase()); 
    });

    // Suppression des appareils déjà sélectionnés
    const selecetdTagAppliances = document.querySelectorAll("#selectedAppliancesList li");
    selecetdTagAppliances.forEach(tag => {
        appliancesList.delete(tag.innerText.toLowerCase());
    });

    // tri par ordre alphabétique en prenant en compte les accents
    const sortedAppliances = Array.from(appliancesList).sort((a, b) => {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
    });
    return sortedAppliances;
}

/**
 * Fonction pour filtrer les appareils électroménagers.
 * Cette fonction permet de filtrer une liste d'appareils électroménagers en fonction de la saisie utilisateur dans un champ de recherche.
 * @function filterAppliances
 * @returns {void}
*/
function filterAppliances() {
    // Réinitialisation de l'affichage des ustensiles tags
    searchInputAppliances.value = '';

    const searchBar = document.getElementById("searchInputAppliances");
    const appliancesList = appliancesListDOM.querySelectorAll("li");

    searchBar.addEventListener("input", function() {
        const searchTerm = searchBar.value.toLowerCase();

        appliancesList.forEach(appliance => {
            const text = appliance.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                appliance.style.display = "block";
            } else {
                appliance.style.display = "none";
            }
        });
    });
}

/**
 * Fonction pour afficher les tags d'appareils électroménagers.
 * Cette fonction prend une liste d'appareils électroménagers et les affiche dans un menu déroulant. Elle permet également d'ajouter des tags d'appareils sélectionnés à une liste.
 * @param {string[]} appliancesList - Liste des appareils électroménagers à afficher.
 * @returns {void}
 */
function displayAppliancesTags(appliancesList) {
    // Réinitialisation de l'affichage des appareils tags
    appliancesListDOM.innerHTML = '';

    const menuNode = document.createElement("ul");
    menuNode.classList.add("menu");

    // Ajouter chaque appareil comme un élément de liste (li)
    appliancesList.forEach(applianceText => {

        // Création de l'appareil à ajouter dans le dropdown
        const newNode = document.createElement("li");
        newNode.classList.add("menu__item");
        newNode.innerHTML = applianceText;
        // Ajouter la liste à votre conteneur dans le DOM
        menuNode.appendChild(newNode);


        /**
         * Clic sur un appareil dans le dropdown
         */
        newNode.addEventListener('click', () => {
            const selectedAppliancesList = document.getElementById("selectedAppliancesList");

            // Création du nouveau tag
            const newSelectedItem = document.createElement("li");
            newSelectedItem.classList.add("newItem");

            // mettre à jour la valeur de la liste avec l'appareil sélectionné
            newSelectedItem.innerHTML = `
                ${applianceText}
                <button class="btnCancel"><i class="fa-solid fa-xmark"></i></button>
            `;
            selectedAppliancesList.appendChild(newSelectedItem);

            // Lancement du tri car modification de la liste de tags
            startSortRecipes();

            const removeItem = newSelectedItem.querySelector(".btnCancel");

            
            // CHEVRON
            const list = appliancesListDOM.closest(".list");
            const chevron = appliancesListDOM.closest('.dropdown').querySelector(".fa-chevron-down");
            // // CHEVRON
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
    appliancesListDOM.appendChild(menuNode);
    // filtre des appareils en fonction de la barre de recherche du dropdown
    filterAppliances();
}