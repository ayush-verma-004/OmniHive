const express = require('express');
const clothController = require('../controllers/cloth.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router
    .route('/')
    .get(clothController.getAllClothes)
    .post(
        authMiddleware.protect,
        upload.array('images', 5),
        clothController.createCloth
    );

router
    .route('/:id')
    .get(clothController.getCloth)
    .patch(
        authMiddleware.protect,
        upload.array('images', 5),
        clothController.updateCloth
    )
    .delete(authMiddleware.protect, clothController.deleteCloth);

module.exports = router;
