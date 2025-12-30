const FoodShop = require('../models/FoodShop');
const FoodItem = require('../models/FoodItem');
const AppError = require('../utils/appError');

// -- SHOP SERVICES --
exports.createShop = async (data) => {
    return await FoodShop.create(data);
};

exports.getAllShops = async () => {
    return await FoodShop.find();
};

exports.getShop = async (id) => {
    const shop = await FoodShop.findById(id);
    if (!shop) throw new AppError('No shop found with that ID', 404);
    return shop;
};

exports.updateShop = async (id, data) => {
    const shop = await FoodShop.findByIdAndUpdate(id, data, { new: true });
    if (!shop) throw new AppError('No shop found with that ID', 404);
    return shop;
};

exports.deleteShop = async (id) => {
    const shop = await FoodShop.findByIdAndDelete(id);
    if (!shop) throw new AppError('No shop found with that ID', 404);
    // Optional: Delete items belonging to shop
    await FoodItem.deleteMany({ shop: id });
    return null;
};

// -- ITEM SERVICES --
exports.createItem = async (data) => {
    return await FoodItem.create(data);
};

exports.getItemsByShop = async (shopId) => {
    return await FoodItem.find({ shop: shopId });
};

exports.getAllItems = async () => {
    return await FoodItem.find().populate('shop', 'name location');
};

exports.getItem = async (id) => {
    const item = await FoodItem.findById(id).populate('shop', 'name location');
    if (!item) throw new AppError('No item found with that ID', 404);
    return item;
};

exports.updateItem = async (id, data) => {
    const item = await FoodItem.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new AppError('No item found with that ID', 404);
    return item;
};

exports.deleteItem = async (id) => {
    const item = await FoodItem.findByIdAndDelete(id);
    if (!item) throw new AppError('No item found with that ID', 404);
    return null;
};

exports.getShopsWithItems = async () => {
    const shops = await FoodShop.find({ isActive: true });
    const shopsWithItems = await Promise.all(
        shops.map(async (shop) => {
            const items = await FoodItem.find({ shop: shop._id });
            return {
                ...shop.toObject(),
                items
            };
        })
    );
    return shopsWithItems;
};
