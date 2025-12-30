const http = require('http');

// Helper to make requests
const request = (options, data = null) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') }));
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTest = async () => {
    try {
        // 1. Get Food Items to find a product ID
        console.log('Fetching food items...');
        const itemsRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/v1/food/items',
            method: 'GET'
        });

        if (itemsRes.statusCode !== 200 || !itemsRes.body.data.items.length) {
            console.log('No food items found. Cannot place order. Please seed an item first via Admin.');
            // If no items, we might need to login as admin -> create item -> then test order.
            // For now let's hope there's an item.

            // Fallback: If no items, let's create one first (requires Admin login)
            if (!itemsRes.body.data.items.length) {
                console.log('Creating a dummy food item...');
                await createDummyItem();
                // Retry fetch
                return runTest();
            }
            return;
        }

        const product = itemsRes.body.data.items[0];
        console.log(`Found product: ${product.name} (ID: ${product._id})`);

        // 2. Place Guest Order
        const orderData = {
            orderType: 'FOOD',
            user: {
                name: 'Guest User',
                email: 'guest@example.com',
                phone: '1234567890',
                address: '123 Guest St, Guest City'
            },
            items: [
                {
                    product: product._id,
                    onModel: 'FoodItem',
                    quantity: 2,
                    price: product.price
                }
            ],
            totalAmount: product.price * 2
        };

        console.log('Placing guest order...');
        const orderRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/v1/orders',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, orderData);

        console.log(`Order Status: ${orderRes.statusCode}`);
        console.log('Order Response:', JSON.stringify(orderRes.body, null, 2));

    } catch (error) {
        console.error('Test failed:', error);
    }
};

const createDummyItem = async () => {
    // 1. Login
    const loginRes = await request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { username: 'igedtx', password: 'ayush@2004' });

    const token = loginRes.body.token;

    // 2. Create Item
    await request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/food/items',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, {
        name: 'Test Burger',
        price: 100,
        description: 'Yummy',
        category: 'Fast Food',
        isVeg: false
    });
    console.log('Dummy item created.');
};

runTest();
