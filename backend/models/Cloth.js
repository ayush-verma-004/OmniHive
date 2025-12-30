const mongoose = require('mongoose');

const clothSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A cloth must have a name'],
            trim: true,
        },
        description: String,
        price: {
            type: Number,
            required: [true, 'A cloth must have a price'],
        },
        images: [
            {
                type: String,
                required: [true, 'At least one image is required'],
            },
        ],
        category: {
            type: String,
            enum: ['Men', 'Women', 'Kids'],
            required: [true, 'A category is required'],
        },
        sizes: [
            {
                type: String,
            },
        ],
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cloth', clothSchema);
