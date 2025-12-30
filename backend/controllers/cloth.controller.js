const clothService = require('../services/cloth.service');
const catchAsync = require('../utils/catchAsync');
const { uploadToCloudinary } = require('../utils/cloudinaryUtils');

exports.getAllClothes = catchAsync(async (req, res, next) => {
    const clothes = await clothService.getAllClothes();
    res.status(200).json({ status: 'success', results: clothes.length, data: { clothes } });
});

exports.createCloth = catchAsync(async (req, res, next) => {
    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file =>
            uploadToCloudinary(file.buffer, 'omnihive/clothes')
        );
        const results = await Promise.all(uploadPromises);
        req.body.images = results.map(result => result.secure_url);
    }

    const newCloth = await clothService.createCloth(req.body);
    res.status(201).json({ status: 'success', data: { cloth: newCloth } });
});

exports.getCloth = catchAsync(async (req, res, next) => {
    const cloth = await clothService.getCloth(req.params.id);
    res.status(200).json({ status: 'success', data: { cloth } });
});

exports.updateCloth = catchAsync(async (req, res, next) => {
    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file =>
            uploadToCloudinary(file.buffer, 'omnihive/clothes')
        );
        const results = await Promise.all(uploadPromises);
        req.body.images = results.map(result => result.secure_url);
    }

    const cloth = await clothService.updateCloth(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { cloth } });
});

exports.deleteCloth = catchAsync(async (req, res, next) => {
    await clothService.deleteCloth(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});
