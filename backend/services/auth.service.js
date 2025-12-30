const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    });
};

exports.login = async (username, password) => {
    if (!username || !password) {
        throw new AppError('Please provide username and password', 400);
    }

    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
        throw new AppError('Incorrect username or password', 401);
    }

    const token = signToken(admin._id);
    return { token, admin };
};

// Signup service removed to restrict admin creation
