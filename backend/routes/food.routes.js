const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Shops
router.get('/shops-with-items', (req, res, next) => {
    console.log('Hit shops-with-items route');
    foodController.getShopsWithItems(req, res, next);
});

router.get('/shops', foodController.getAllShops);
router.post('/shops', authMiddleware.protect, upload.single('image'), foodController.createShop);

router
    .route('/shops/:id')
    .get(foodController.getShop)
    .patch(
        authMiddleware.protect,
        upload.single('image'),
        foodController.updateShop
    )
    .delete(authMiddleware.protect, foodController.deleteShop);

router.get('/shops/:shopId/items', foodController.getItemsByShop);

// Items
router
    .route('/items')
    .get(foodController.getAllItems)
    .post(
        authMiddleware.protect,
        upload.single('image'),
        foodController.createItem
    );

router
    .route('/items/:id')
    .get(foodController.getItem)
    .patch(
        authMiddleware.protect,
        upload.single('image'),
        foodController.updateItem
    )
    .delete(authMiddleware.protect, foodController.deleteItem);

module.exports = router;
