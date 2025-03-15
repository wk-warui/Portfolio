// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeFormValidation();
    initializeAnalytics();
    initializePortfolioFilters();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sticky navigation handling
    let nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Form validation and submission
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Get reCAPTCHA token
            const recaptchaToken = grecaptcha.getResponse();
            if (!recaptchaToken) {
                showNotification('Please complete the reCAPTCHA', 'error');
                return;
            }

            try {
                const formData = new FormData(this);
                formData.append('recaptchaToken', recaptchaToken);

                const response = await submitForm(formData);
                if (response.success) {
                    showNotification('Message sent successfully!', 'success');
                    this.reset();
                    grecaptcha.reset();
                } else {
                    throw new Error(response.message || 'Form submission failed');
                }
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
}

// Form validation helper
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

// Form submission helper
async function submitForm(formData) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Portfolio filtering
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Analytics tracking
function initializeAnalytics() {
    // Portfolio item click tracking
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            gtag('event', 'portfolio_item_click', {
                'item_name': item.querySelector('h3').textContent,
                'item_category': item.dataset.category
            });
        });
    });

    // Scroll depth tracking
    let scrollDepths = [25, 50, 75, 100];
    let scrolledDepths = new Set();

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY + window.innerHeight) / 
                            document.documentElement.scrollHeight * 100;
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrolledDepths.has(depth)) {
                scrolledDepths.add(depth);
                gtag('event', 'scroll_depth', {
                    'depth': depth
                });
            }
        });
    });
}

// Animation handling
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Price calculator
function calculatePrice() {
    const wordCount = document.getElementById('wordCount').value;
    const contentType = document.getElementById('contentType').value;
    
    const rates = {
        'technical': 0.15,
        'blog': 0.12,
        'copywriting': 0.10
    };

    const counts = {
        '500-1000': 750,
        '1000-2000': 1500,
        '2000-3000': 2500,
        '3000+': 3500
    };

    if (wordCount && contentType) {
        const rate = rates[contentType] || 0.12;
        const count = counts[wordCount] || 0;
        const total = rate * count;
        
        document.getElementById('estimatedPrice').textContent = 
            total.toFixed(2);
    }
} 