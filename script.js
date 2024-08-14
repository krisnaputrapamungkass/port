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

    // Function to open CV PDF
    function openCVPDF() {
        const pdfUrl = 'https://drive.google.com/file/d/1JFxIUwyxmo2wqk-dwOSgiEdHf7PyJLgp/view?usp=sharing';
        window.open(pdfUrl, '_blank');
    }

    // Add click event listener to the Download CV button
    const downloadCVButton = document.getElementById('downloadCV');
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            openCVPDF();
        });
    }

    // Inisialisasi EmailJS
    emailjs.init("29wXn17FzPEPeQge0");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Menampilkan loading indicator
            const submitButton = contactForm.querySelector('input[type="submit"]');
            const originalButtonText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Persiapkan parameter untuk dikirim
            const templateParams = {
                from_name: contactForm.elements['name'].value,
                from_email: contactForm.elements['email'].value,
                subject: contactForm.elements['subject'].value,
                message: contactForm.elements['message'].value,
                mobile: contactForm.elements['mobile'].value
            };

            // Kirim email menggunakan EmailJS
            emailjs.send("service_m2bhtks", "template_9kxt20o", templateParams) 
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Menggunakan SweetAlert untuk menampilkan pesan sukses
                Swal.fire({
                    icon: 'success',
                    title: 'Pesan Terkirim!',
                    text: 'Pesan Anda telah berhasil dikirim.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Kembali ke keadaan semula setelah alert ditutup
                    submitButton.value = originalButtonText;
                    submitButton.disabled = false;
                    contactForm.reset();
                });
            
            }, function(error) {
                console.log('FAILED...', error);
            
                // Menggunakan SweetAlert untuk menampilkan pesan error
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengirim Pesan',
                    text: 'Pesan gagal dikirim. Silakan coba lagi nanti.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Kembali ke keadaan semula setelah alert ditutup
                    submitButton.value = originalButtonText;
                    submitButton.disabled = false;
                });
            })
            .finally(function() {
                // Mengembalikan tombol ke keadaan semula jika tidak menggunakan SweetAlert
                submitButton.value = originalButtonText;
                submitButton.disabled = false;
            });
            
        });
    }
});