// script.js - NITELITE Audition LP Interactions

document.addEventListener('DOMContentLoaded', () => {

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all animated elements
    const animatedElements = document.querySelectorAll('.fade-up, .fade-up-delay, .fade-up-delay-2, .fade-left, .fade-right, .fade-in, .fade-in-delay');

    // Observe them
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add subtle mouse move parallax effect to hero background (desktop only)
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (hero && heroBg && !isTouchDevice) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Move background slightly in opposite direction of mouse
            heroBg.style.transform = `translate(-${x * 20}px, -${y * 20}px) scale(1.05)`;
        });

        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            heroBg.style.transform = 'translate(0, 0) scale(1)';
            heroBg.style.transition = 'transform 0.5s ease-out';
        });

        hero.addEventListener('mouseenter', () => {
            heroBg.style.transition = 'none';
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Floating CTA visibility
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.querySelector('.hero');
    const entrySection = document.querySelector('.entry');

    if (floatingCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const entryTop = entrySection ? entrySection.getBoundingClientRect().top : Infinity;
            const windowHeight = window.innerHeight;

            if (heroBottom < 0 && entryTop > windowHeight * 0.5) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

});
