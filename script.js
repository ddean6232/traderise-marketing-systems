// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    if (nav.style.display === 'block') {
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(11, 21, 36, 0.95)';
        nav.style.padding = '1rem';
        nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        
        const ul = nav.querySelector('ul');
        ul.style.flexDirection = 'column';
        ul.style.alignItems = 'center';
        ul.style.gap = '1rem';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (window.innerWidth <= 768 && nav.style.display === 'block') {
            nav.style.display = 'none';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.section-title, .section-subtitle, .step-card, .feature-list li').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index % 3 * 0.1}s`;
    
    // Create the visible class dynamically in CSS via JS
    if(!document.querySelector('style#animations')) {
        const style = document.createElement('style');
        style.id = 'animations';
        style.innerHTML = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    observer.observe(el);
});

// Animate the hero stats counting up (simulate dynamic data)
const statValues = document.querySelectorAll('.stat-value');
let animated = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !animated) {
        animated = true;
        // Basic animation effect
        statValues[0].innerHTML = '156'; // simulate live lead counter jump
        setTimeout(() => statValues[0].innerHTML = '158', 3000);
    }
});
