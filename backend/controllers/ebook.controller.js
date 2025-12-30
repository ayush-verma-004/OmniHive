const ebookService = require('../services/ebook.service');
const catchAsync = require('../utils/catchAsync');
const { uploadToCloudinary } = require('../utils/cloudinaryUtils');

exports.getAllEBooks = catchAsync(async (req, res, next) => {
    const ebooks = await ebookService.getAllEBooks();
    res.status(200).json({
        status: 'success',
        results: ebooks.length,
        data: { ebooks },
    });
});

exports.createEBook = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/ebooks');
        req.body.coverImage = result.secure_url;
    }

    const newEBook = await ebookService.createEBook(req.body);
    res.status(201).json({
        status: 'success',
        data: { ebook: newEBook },
    });
});

exports.getEBook = catchAsync(async (req, res, next) => {
    const ebook = await ebookService.getEBook(req.params.id);
    res.status(200).json({
        status: 'success',
        data: { ebook },
    });
});

exports.updateEBook = catchAsync(async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'omnihive/ebooks');
        req.body.coverImage = result.secure_url;
    }

    const ebook = await ebookService.updateEBook(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: { ebook },
    });
});

exports.deleteEBook = catchAsync(async (req, res, next) => {
    await ebookService.deleteEBook(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.trackClick = catchAsync(async (req, res, next) => {
    await ebookService.trackClick(req.params.id);
    res.status(200).json({ status: 'success', message: 'Click tracked' });
});
