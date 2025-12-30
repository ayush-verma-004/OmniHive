const orderService = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json({ status: 'success', data: { order: newOrder } });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

exports.getOrder = catchAsync(async (req, res, next) => {
    const order = await orderService.getOrder(req.params.id);
    res.status(200).json({ status: 'success', data: { order } });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
    const order = await orderService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ status: 'success', data: { order } });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    console.log('Backend: Request to delete order:', req.params.id);
    const order = await orderService.deleteOrder(req.params.id);
    console.log('Backend: Order deleted successfully');
    res.status(204).json({ status: 'success', data: null });
});
