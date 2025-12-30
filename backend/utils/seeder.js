const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const adminExists = await Admin.findOne();
        if (adminExists) {
            console.log('Admin user already exists. Skipping seeding.');
            return;
        }

        const username = 'igedtx';
        const password = 'ayush@2004';
        
        // Note: Password hashing is handled by the Admin model pre-save hook
        await Admin.create({
            username,
            password
        });
        
        console.log(`Default admin created: ${username}`);
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
