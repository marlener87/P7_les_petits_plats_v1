const dropdowns = document.querySelectorAll('.dropdown');

// boucle qui parcourt chaque élément du dropdown
dropdowns.forEach(dropdown => {
    // Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const chevron = dropdown.querySelector('.fa-chevron-down');
    const list = dropdown.querySelector('.list');
    const options = dropdown.querySelectorAll('.menu li');
    //const selected = dropdown.querySelector('.selected');
    //const newsNodes = dropdown.querySelectorAll('.menu__item');

    // Ajoute un évènement au clic d'un élément sélectionné 
    select.addEventListener('click', () => {
        chevron.classList.toggle('fa-chevron-down-rotate');
        list.classList.toggle('list-open');
    });

    // parcourt chaque option dans la liste déroulante
    options.forEach(option => {
        // ajoute un évènement de clic à chaque option
        option.addEventListener('click', () => {
            //selected.innerText = option.innerText;

            //select.classList.remove('select-clicked');
            chevron.classList.remove('fa-chevron-down-rotate');
            //menu.classList.remove('menu-open');

            // options.forEach(option => {
            //     option.classList.remove('active');
            // });

            // option.classList.add('active');
        });
    });
});