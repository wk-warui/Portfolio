// main.js - Organized Structure

// 1. Constants & Config
const CONFIG = {
    animationDuration: 300,
    breakpoints: {
        mobile: 768,
        tablet: 1024
    }
};

// 2. Utility Functions
const utils = {
    debounce(func, wait) {
        // ... debounce implementation
    },
    
    formatDate(date) {
        // ... date formatting
    }
};

// 3. Component Classes
class Navigation {
    constructor() {
        // ... navigation setup
    }
    
    init() {
        // ... initialize navigation
    }
}

class ProjectFilter {
    constructor() {
        // ... project filter setup
    }
    
    init() {
        // ... initialize filtering
    }
}

// 4. Event Handlers
function handleScroll() {
    // ... scroll handling
}

function handleFormSubmit(event) {
    // ... form submission
}

// 5. Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const nav = new Navigation();
    nav.init();
    
    // Setup event listeners
    window.addEventListener('scroll', handleScroll);

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize contact tracking
    initializeContactTracking();

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
    });

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });

    // Scroll to Top
    const scrollTop = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navigation Scroll Effect
    const navElement = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navElement.classList.add('scrolled');
        } else {
            navElement.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Form Submission Animation
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('.submit-button');
        submitButton.innerHTML = '<div class="loader"></div>';
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        submitButton.innerHTML = 'Sent!';
        setTimeout(() => {
            submitButton.innerHTML = 'Send Message';
            form.reset();
        }, 3000);
    });

    // Ripple Effect
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', e => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            ripple.classList.add('ripple-effect');
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Portfolio Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 0);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Testimonials Slider
    class TestimonialsSlider {
        constructor() {
            this.slider = document.querySelector('.testimonials-slider');
            this.slides = this.slider.children;
            this.currentSlide = 0;
            this.init();
        }

        init() {
            if (this.slides.length > 1) {
                this.autoSlide();
                this.addTouchSupport();
            }
        }

        autoSlide() {
            setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.slider.scrollTo({
                    left: this.slides[this.currentSlide].offsetLeft,
                    behavior: 'smooth'
                });
            }, 5000);
        }

        addTouchSupport() {
            let startX, scrollLeft;

            this.slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - this.slider.offsetLeft;
                scrollLeft = this.slider.scrollLeft;
            });

            this.slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const x = e.touches[0].pageX - this.slider.offsetLeft;
                const walk = (x - startX) * 2;
                this.slider.scrollLeft = scrollLeft - walk;
            });
        }
    }

    new TestimonialsSlider();
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const response = await submitForm(formData);
        
        if (response.success) {
            showNotification('Message sent successfully!', 'success');
            e.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showNotification('Error sending message. Please try again.', 'error');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function initializeContactTracking() {
    // Track contact link clicks
    document.querySelectorAll('.contact-list a, .whatsapp-float').forEach(link => {
        link.addEventListener('click', function(e) {
            const type = this.href.includes('wa.me') ? 'whatsapp' : 
                        this.href.includes('tel:') ? 'phone' : 
                        this.href.includes('mailto:') ? 'email' : 'linkedin';
            
            // Track event (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_click', {
                    'contact_type': type
                });
            }
        });
    });
} 