const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .post(orderController.createOrder) // Public
    .get(authMiddleware.protect, orderController.getAllOrders); // Admin

router
    .route('/:id')
    .get(authMiddleware.protect, orderController.getOrder) // Admin (or protect via email?)
    .patch(authMiddleware.protect, orderController.updateStatus) // Admin
    .delete(authMiddleware.protect, orderController.deleteOrder); // Admin

module.exports = router;
