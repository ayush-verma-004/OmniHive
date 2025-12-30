const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A food item must have a name'],
            trim: true,
        },
        description: String,
        price: {
            type: Number,
            required: [true, 'A food item must have a price'],
        },
        image: {
            type: String,
            required: [true, 'A food item must have an image'],
        },
        category: {
            type: String,
            required: [true, 'A food item must have a category'], // e.g., Starter, Main Course
        },
        isVeg: {
            type: Boolean,
            default: true,
        },
        availableFrom: {
            type: String,
            default: '09:00',
        },
        availableTo: {
            type: String,
            default: '22:00',
        },
        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodShop',
            required: [true, 'A food item must belong to a shop'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FoodItem', foodItemSchema);
