# OmniHive Backend

Node.js Backend for OmniHive MERN Application.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (Image Upload)
- JWT (Authentication)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   - Copy `.env.example` to `.env`
   - Add your MongoDB URI and Cloudinary credentials
3. Start Server:
   ```bash
   npm start
   ```

## API Endpoints

### Auth
- `POST /api/v1/auth/login` - Admin Login
- `POST /api/v1/auth/signup` - Create Admin (Dev use only)

### E-Books
- `GET /api/v1/ebooks` - Get all ebooks
- `GET /api/v1/ebooks/:id` - Get ebook details
- `POST /api/v1/ebooks` - Create ebook (Admin, Form-data with `coverImage`)
- `PATCH /api/v1/ebooks/:id` - Update ebook (Admin)
- `DELETE /api/v1/ebooks/:id` - Delete ebook (Admin)
- `GET /api/v1/ebooks/track/:id` - Track click (Public)

### Food
- `GET /api/v1/food/shops` - Get all shops
- `GET /api/v1/food/shops/:id` - Get shop details
- `POST /api/v1/food/shops` - Create shop (Admin, Form-data with `image`)
- `GET /api/v1/food/shops/:shopId/items` - Get items by shop
- `GET /api/v1/food/items` - Get all items
- `POST /api/v1/food/items` - Create item (Admin, Form-data with `image`)
- `PATCH /api/v1/food/items/:id` - Update item (Admin)
- `DELETE /api/v1/food/items/:id` - Delete item (Admin)

### Clothes
- `GET /api/v1/clothes` - Get all clothes
- `GET /api/v1/clothes/:id` - Get cloth details
- `POST /api/v1/clothes` - Create cloth (Admin, Form-data with `images` array)
- `PATCH /api/v1/clothes/:id` - Update cloth (Admin)
- `DELETE /api/v1/clothes/:id` - Delete cloth (Admin)

### Orders
- `POST /api/v1/orders` - Place Order (Public)
  - Body: `{ orderType: 'FOOD'|'CLOTHES'|'EBOOK', user: {...}, items: [...], totalAmount: 100 }`
- `GET /api/v1/orders` - Get all orders (Admin)
- `GET /api/v1/orders/:id` - Get order details (Admin)
- `PATCH /api/v1/orders/:id` - Update status (Admin)
  - Body: `{ status: 'Processing'|'Delivered'|'Cancelled' }`
