document.addEventListener('DOMContentLoaded', () => {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let darkModeIcon = document.querySelector('#darkMode-icon');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelector('header nav').querySelectorAll('a');

    // Toggle the navbar visibility on menu icon click
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('open');
        menuIcon.classList.toggle('bx-x');
    });

    // Handle scrolling to update active link and sticky header
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        let header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 100);
    };

    // Initialize menu icon and navbar states
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('open');

    // Toggle dark mode
    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        darkModeIcon.classList.toggle('bx-moon');
        document.body.classList.toggle('dark-mode');
    };

    // ScrollReveal configurations
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .portofolio-box, .contact form ', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
});