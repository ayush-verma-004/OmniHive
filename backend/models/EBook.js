const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A book must have a title'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'A book must have an author'],
        },
        description: {
            type: String,
            required: [true, 'A book must have a description'],
        },
        price: {
            type: Number,
            required: [true, 'A book must have a price'],
        },
        coverImage: {
            type: String,
            required: [true, 'A book must have a cover image'],
        },
        affiliateLink: {
            type: String,
            required: [true, 'A book must have an affiliate link'],
        },
        clicks: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('EBook', ebookSchema);
