const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Admin = require('../models/Admin');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await Admin.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token no longer does exist.', 401)
        );
    }

    req.user = currentUser;
    next();
});
