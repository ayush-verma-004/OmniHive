const foodService = require('../services/food.service');
const catchAsync = require('../utils/catchAsync');
const { uploadToCloudinary } = require('../utils/cloudinaryUtils');

// -- SHOP CONTROLLERS --
exports.getAllShops = catchAsync(async (req, res, next) => {
    const shops = await foodService.getAllShops();
    res.status(200).json({ status: 'success', results: shops.length, data: { shops } });
});

exports.createShop = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/food/shops');
        req.body.image = result.secure_url;
    }
    const newShop = await foodService.createShop(req.body);
    res.status(201).json({ status: 'success', data: { shop: newShop } });
});

exports.getShop = catchAsync(async (req, res, next) => {
    const shop = await foodService.getShop(req.params.id);
    res.status(200).json({ status: 'success', data: { shop } });
});

exports.updateShop = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/food/shops');
        req.body.image = result.secure_url;
    }
    const shop = await foodService.updateShop(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { shop } });
});

exports.deleteShop = catchAsync(async (req, res, next) => {
    await foodService.deleteShop(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});

exports.getShopsWithItems = catchAsync(async (req, res, next) => {
    const shops = await foodService.getShopsWithItems();
    res.status(200).json({ status: 'success', results: shops.length, data: { shops } });
});

// -- ITEM CONTROLLERS --
exports.createItem = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/food/items');
        req.body.image = result.secure_url;
    }
    const newItem = await foodService.createItem(req.body);
    res.status(201).json({ status: 'success', data: { item: newItem } });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
    const items = await foodService.getAllItems();
    res.status(200).json({ status: 'success', results: items.length, data: { items } });
});

exports.getItemsByShop = catchAsync(async (req, res, next) => {
    const items = await foodService.getItemsByShop(req.params.shopId);
    res.status(200).json({ status: 'success', results: items.length, data: { items } });
});

exports.getItem = catchAsync(async (req, res, next) => {
    const item = await foodService.getItem(req.params.id);
    res.status(200).json({ status: 'success', data: { item } });
});

exports.updateItem = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/food/items');
        req.body.image = result.secure_url;
    }
    const item = await foodService.updateItem(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { item } });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
    await foodService.deleteItem(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});
