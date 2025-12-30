const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const AppError = require('./utils/appError');
const errorMiddleware = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/auth.routes');
const ebookRoutes = require('./routes/ebook.routes');
const foodRoutes = require('./routes/food.routes');
const clothRoutes = require('./routes/cloth.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP to allow Cloudinary images easily in production
}));
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Server is healthy and updated' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ebooks', ebookRoutes);
app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/clothes', clothRoutes);
app.use('/api/v1/orders', orderRoutes);

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));

    // Handle SPA routing
    app.use((req, res, next) => {
        // If it's a GET request and NOT for an API or static file that exists
        if (req.method === 'GET' && !req.path.startsWith('/api')) {
            return res.sendFile(path.resolve(frontendPath, 'index.html'));
        }
        next();
    });
} else {
    // Unhandled Routes (Development only)
    app.use((req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
}

// Error Handler
app.use(errorMiddleware);

module.exports = app;
