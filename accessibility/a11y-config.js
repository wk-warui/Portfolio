// Accessibility Implementation
const a11yConfig = {
    // ARIA labels and roles
    ariaSetup: () => {
        // Navigation
        const nav = document.querySelector('nav');
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');

        // Portfolio sections
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.setAttribute('role', 'article');
            item.setAttribute('aria-labelledby', `portfolio-title-${index}`);
        });

        // Form labels
        document.querySelectorAll('form').forEach(form => {
            form.querySelectorAll('input, textarea').forEach(field => {
                if (!field.getAttribute('aria-label')) {
                    const label = document.querySelector(`label[for="${field.id}"]`);
                    if (label) {
                        field.setAttribute('aria-label', label.textContent);
                    }
                }
            });
        });
    },

    // Keyboard navigation
    keyboardNav: () => {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('show-focus-rings');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('show-focus-rings');
        });
    },

    // Color contrast checker
    checkContrast: (foreground, background) => {
        const luminance = (r, g, b) => {
            const [rs, gs, bs] = [r, g, b].map(c => {
                c = c / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };

        const contrast = (l1, l2) => {
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        };

        return contrast(
            luminance(foreground[0], foreground[1], foreground[2]),
            luminance(background[0], background[1], background[2])
        );
    }
};

// CSS for accessibility
const a11yStyles = `
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        z-index: 100;
        transition: top 0.3s;
    }

    .skip-link:focus {
        top: 0;
    }

    body:not(.show-focus-rings) *:focus {
        outline: none;
    }

    .show-focus-rings *:focus {
        outline: 3px solid #4A90E2;
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
`;

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    a11yConfig.ariaSetup();
    a11yConfig.keyboardNav();
    
    // Add accessibility styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = a11yStyles;
    document.head.appendChild(styleSheet);
});