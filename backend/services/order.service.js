const Order = require('../models/Order');
const AppError = require('../utils/appError');

exports.createOrder = async (data) => {
    // For food orders, auto-assign the shop from the first item
    if (data.orderType === 'FOOD' && data.items && data.items.length > 0) {
        const FoodItem = require('../models/FoodItem');
        const firstItem = await FoodItem.findById(data.items[0].product);
        if (firstItem) {
            data.shop = firstItem.shop;
        }
    }
    return await Order.create(data);
};

exports.getAllOrders = async () => {
    return await Order.find().populate('items.product').populate('shop');
};

exports.getOrder = async (id) => {
    const order = await Order.findById(id).populate('items.product').populate('shop');
    if (!order) throw new AppError('No order found with that ID', 404);
    return order;
};

exports.updateStatus = async (id, status) => {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) throw new AppError('No order found with that ID', 404);
    return order;
};

exports.deleteOrder = async (id) => {
    const order = await Order.findByIdAndDelete(id);
    if (!order) throw new AppError('No order found with that ID', 404);
    return null;
};
