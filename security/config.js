// Security Configurations
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const csurf = require('csurf');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = function(app) {
    // Basic security headers
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", 
                    "https://www.google-analytics.com",
                    "https://www.google.com/recaptcha/",
                    "https://www.gstatic.com/recaptcha/"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", 
                    "https://www.google-analytics.com"],
                frameSrc: ["https://www.google.com/recaptcha/"],
                upgradeInsecureRequests: []
            }
        },
        crossOriginEmbedderPolicy: false
    }));

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    });
    app.use('/api/', limiter);

    // CORS configuration
    const corsOptions = {
        origin: process.env.ALLOWED_ORIGINS.split(','),
        methods: ['GET', 'POST'],
        credentials: true,
        maxAge: 86400 // 24 hours
    };
    app.use(cors(corsOptions));

    // CSRF protection
    app.use(csurf({ cookie: true }));

    // Data sanitization
    app.use(mongoSanitize());

    // XSS prevention
    app.use((req, res, next) => {
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}; 