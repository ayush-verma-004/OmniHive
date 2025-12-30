const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const FoodShop = require('../models/FoodShop');
const FoodItem = require('../models/FoodItem');

const seedProducts = async () => {
    try {
        await connectDB();

        // 1. Seed Shop
        let shop = await FoodShop.findOne({ name: 'Test Shop' });
        if (!shop) {
            shop = await FoodShop.create({
                name: 'Test Shop',
                description: 'Best food in town',
                image: 'https://via.placeholder.com/150',
                location: 'Downtown'
            });
            console.log('Seeded Shop:', shop.name);
        } else {
            console.log('Shop already exists:', shop.name);
        }

        // 2. Seed Item
        let item = await FoodItem.findOne({ name: 'Test Burger', shop: shop._id });
        if (!item) {
            item = await FoodItem.create({
                name: 'Test Burger',
                description: 'Juicy and cheesy',
                price: 15.99,
                image: 'https://via.placeholder.com/150',
                category: 'Main Course',
                isVeg: false,
                shop: shop._id
            });
            console.log('Seeded Item:', item.name);
        } else {
            console.log('Item already exists:', item.name);
        }

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedProducts();
