const dropdowns = document.querySelectorAll('.dropdown');

// boucle qui parcourt chaque élément du dropdown
// dropdowns.forEach(dropdown => {
//     // Get inner elements from each dropdown
//     const select = dropdown.querySelector('.select');
//     const chevron = dropdown.querySelector('.fa-chevron-down');
//     const list = dropdown.querySelector('.list');

//     //Ajoute un évènement au clic d'un élément sélectionné 
//     select.addEventListener('click', () => {
//         chevron.classList.toggle('fa-chevron-down-rotate');
//         list.classList.toggle('list-open');
//     });
// });


for (let i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];

    // Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const chevron = dropdown.querySelector('.fa-chevron-down');
    const list = dropdown.querySelector('.list');

    //Ajoute un évènement au clic d'un élément sélectionné 
    select.addEventListener('click', () => {
        chevron.classList.toggle('fa-chevron-down-rotate');
        list.classList.toggle('list-open');
    });
}