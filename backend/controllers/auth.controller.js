const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const { token, admin } = await authService.login(username, password);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            admin,
        },
    });
});

// Signup endpoint removed to restrict admin creation
