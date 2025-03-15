// Enhanced Analytics Configuration
const analyticsConfig = {
    // Google Analytics 4 Setup
    initGA4: () => {
        gtag('config', process.env.GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
            custom_map: {
                dimension1: 'content_category',
                dimension2: 'user_engagement',
                metric1: 'scroll_depth'
            }
        });
    },

    // Custom Event Tracking
    trackEvents: {
        // Content engagement tracking
        trackContentEngagement: () => {
            let startTime = Date.now();
            let scrollDepth = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY + window.innerHeight;
                const newScrollDepth = Math.round(
                    (currentScroll / document.documentElement.scrollHeight) * 100
                );

                if (newScrollDepth > scrollDepth) {
                    scrollDepth = newScrollDepth;
                    gtag('event', 'scroll_depth', {
                        'depth': scrollDepth,
                        'page': window.location.pathname
                    });
                }
            });

            // Time on page tracking
            window.addEventListener('beforeunload', () => {
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                gtag('event', 'time_on_page', {
                    'time': timeSpent,
                    'page': window.location.pathname
                });
            });
        },

        // Portfolio interaction tracking
        trackPortfolioInteractions: () => {
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.addEventListener('click', () => {
                    gtag('event', 'portfolio_interaction', {
                        'item_title': item.querySelector('h3').textContent,
                        'item_category': item.dataset.category
                    });
                });
            });
        },

        // Form interaction tracking
        trackFormInteractions: () => {
            const form = document.querySelector('#contactForm');
            if (form) {
                form.addEventListener('submit', () => {
                    gtag('event', 'form_submission', {
                        'form_id': 'contact',
                        'page': window.location.pathname
                    });
                });

                // Track form field interactions
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.addEventListener('focus', () => {
                        gtag('event', 'form_field_focus', {
                            'field_name': field.name
                        });
                    });
                });
            }
        }
    },

    // Custom reporting
    setupCustomReports: () => {
        // Content performance report
        gtag('config', process.env.GA_MEASUREMENT_ID, {
            custom_map: {
                metric1: 'scroll_depth',
                metric2: 'time_on_page',
                dimension1: 'content_category'
            }
        });
    }
};

// Initialize all tracking
document.addEventListener('DOMContentLoaded', () => {
    analyticsConfig.initGA4();
    analyticsConfig.trackEvents.trackContentEngagement();
    analyticsConfig.trackEvents.trackPortfolioInteractions();
    analyticsConfig.trackEvents.trackFormInteractions();
    analyticsConfig.setupCustomReports();
});