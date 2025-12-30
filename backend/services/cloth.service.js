const Cloth = require('../models/Cloth');
const AppError = require('../utils/appError');

exports.createCloth = async (data) => {
    return await Cloth.create(data);
};

exports.getAllClothes = async () => {
    return await Cloth.find();
};

exports.getCloth = async (id) => {
    const cloth = await Cloth.findById(id);
    if (!cloth) throw new AppError('No cloth found with that ID', 404);
    return cloth;
};

exports.updateCloth = async (id, data) => {
    const cloth = await Cloth.findByIdAndUpdate(id, data, { new: true });
    if (!cloth) throw new AppError('No cloth found with that ID', 404);
    return cloth;
};

exports.deleteCloth = async (id) => {
    const cloth = await Cloth.findByIdAndDelete(id);
    if (!cloth) throw new AppError('No cloth found with that ID', 404);
    return null;
};
