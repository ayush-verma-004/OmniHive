const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const uploadToCloudinary = (buffer, folder = 'omnihive') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = { uploadToCloudinary };
