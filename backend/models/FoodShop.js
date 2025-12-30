const mongoose = require('mongoose');

const foodShopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A shop must have a name'],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'A shop must have a description'],
        },
        image: {
            type: String,
            required: [true, 'A shop must have an image'],
        },
        location: {
            type: String,
            required: [true, 'A shop must have a location'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        openingTime: {
            type: String,
            default: '09:00',
        },
        closingTime: {
            type: String,
            default: '22:00',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FoodShop', foodShopSchema);
