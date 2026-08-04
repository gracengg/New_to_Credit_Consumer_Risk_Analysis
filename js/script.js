document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Navigation ---
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', String(isOpen));

            // Animate Hamburger
            const bars = navToggle.querySelectorAll('.bar');
            if (isOpen) {
                bars[0].style.transform = 'translateY(6px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'translateY(0) rotate(0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'translateY(0) rotate(0)';
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains('active')) {
                navToggle.click(); 
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Elegant Scroll Reveal Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once revealed to keep it clean
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up-element').forEach(el => {
        revealObserver.observe(el);
    });

});