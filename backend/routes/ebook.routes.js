const express = require('express');
const ebookController = require('../controllers/ebook.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/track/:id', ebookController.trackClick); // Open to public

router
    .route('/')
    .get(ebookController.getAllEBooks)
    .post(
        authMiddleware.protect,
        upload.single('coverImage'),
        ebookController.createEBook
    );

router
    .route('/:id')
    .get(ebookController.getEBook)
    .patch(
        authMiddleware.protect,
        upload.single('coverImage'),
        ebookController.updateEBook
    )
    .delete(authMiddleware.protect, ebookController.deleteEBook);

module.exports = router;
