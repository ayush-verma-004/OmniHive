const EBook = require('../models/EBook');
const AppError = require('../utils/appError');

exports.createEBook = async (data) => {
    return await EBook.create(data);
};

exports.getAllEBooks = async (query) => {
    return await EBook.find();
};

exports.getEBook = async (id) => {
    const ebook = await EBook.findById(id);
    if (!ebook) throw new AppError('No ebook found with that ID', 404);
    return ebook;
};

exports.updateEBook = async (id, data) => {
    const ebook = await EBook.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!ebook) throw new AppError('No ebook found with that ID', 404);
    return ebook;
};

exports.deleteEBook = async (id) => {
    const ebook = await EBook.findByIdAndDelete(id);
    if (!ebook) throw new AppError('No ebook found with that ID', 404);
    return null;
};

exports.trackClick = async (id) => {
    const ebook = await EBook.findByIdAndUpdate(id, { $inc: { clicks: 1 } }, { new: true });
    if (!ebook) throw new AppError('No ebook found with that ID', 404);
    return ebook;
};
