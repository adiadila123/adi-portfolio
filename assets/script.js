// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* === Theme: default dark, persist choice === */
(function initTheme() {
    const saved = localStorage.getItem('theme');
    const initial = saved ? saved : 'dark'; // default = dark
    const isDark = initial === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    // set correct icon
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (isDark) { icon.classList.add('fa-sun'); icon.classList.remove('fa-moon'); }
            else { icon.classList.add('fa-moon'); icon.classList.remove('fa-sun'); }
        }
    }
})();

// Theme toggle functionality (persist + icon swap)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
        const nowDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', nowDark);
        try { localStorage.setItem('theme', nowDark ? 'dark' : 'light'); } catch (e) {}
        if (nowDark) { themeIcon.classList.add('fa-sun'); themeIcon.classList.remove('fa-moon'); }
        else { themeIcon.classList.add('fa-moon'); themeIcon.classList.remove('fa-sun'); }
    });
}

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
            const isDark = document.body.classList.contains('dark-mode');
            navLinks.style.flexDirection = 'column';
            navLinks.style.gap = '1rem';
            navLinks.style.background = isDark ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '16px';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '12px';
            navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        }
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            if (window.innerWidth <= 768 && navLinks) navLinks.style.display = 'none';
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const payload = Object.fromEntries(formData.entries());
        console.log('Form submitted:', payload);
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinkEls = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 100)) current = section.getAttribute('id');
    });
    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});
