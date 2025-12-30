const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderType: {
            type: String,
            enum: ['FOOD', 'CLOTHES', 'EBOOK'],
            required: [true, 'Order type is required'],
        },
        user: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: 'items.onModel',
                },
                onModel: {
                    type: String,
                    required: true,
                    enum: ['FoodItem', 'Cloth', 'EBook'],
                },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },
                size: { type: String }, // For clothes
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        deliveryTime: {
            type: String,
        },
        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodShop',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
