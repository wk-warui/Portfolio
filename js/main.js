document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize contact tracking
    initializeContactTracking();
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