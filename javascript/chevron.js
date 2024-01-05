const dropdowns = document.querySelectorAll('.dropdown');

// loop through all dropdown elements
dropdowns.forEach(dropdown => {
    // Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const chevron = dropdown.querySelector('.fa-chevron-down');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Add a click event to the select element
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        chevron.classList.toggle('fa-chevron-down-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;

            select.classList.remove('select-clicked');
            chevron.classList.remove('fa-chevron-down-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');
        });
    });
});