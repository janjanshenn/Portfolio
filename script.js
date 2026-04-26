// Basic Script for Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Sticky Navbar Effect on Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 0';
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 4. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // 5. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const text = typewriter.innerHTML;
        typewriter.innerHTML = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typewriter.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 1000);
    }

    // 6. Scroll Reveal & Skill Bar Animation
    const reveals = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress');

    // Pre-store widths and reset bars to 0
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                if (!reveal.classList.contains('active')) {
                    reveal.classList.add('active');
                    
                    // If this is the skills section, animate bars
                    if (reveal.id === 'skills') {
                        skillBars.forEach(bar => {
                            const targetWidth = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = targetWidth;
                            }, 200);
                        });
                    }
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    btn.innerHTML = 'Message Sent ✓';
                    btn.style.background = '#10b981'; // Green
                    btn.style.opacity = '1';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = ''; // Reset to default
                        btn.disabled = false;
                    }, 3000);
                })
                .catch((error) => {
                    // Error State
                    btn.innerHTML = 'Error! Try Again';
                    btn.style.background = '#ef4444'; // Red
                    btn.style.opacity = '1';
                    console.error(error);

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // 7. Project Tabs Handling
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        // Handle loading specific tab from URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
            if (targetBtn) {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                targetBtn.classList.add('active');
                document.getElementById(hash).classList.add('active');
            }
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);

                if (targetContent) {
                    targetContent.classList.add('active');
                    // Update URL hash without scrolling the page
                    window.history.replaceState(null, null, `#${targetId}`);
                }
            });
        });
    }
});
