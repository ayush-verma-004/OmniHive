require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
const seedAdmin = require('./utils/seeder');

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Connect Database & Cloudinary
connectDB().then(() => {
    seedAdmin();
});
connectCloudinary();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
