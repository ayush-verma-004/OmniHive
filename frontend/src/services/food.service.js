import api from './api';

// Shops
const getAllShops = async () => {
    const response = await api.get('/food/shops');
    return response.data.data.shops;
};

const getShopsWithItems = async () => {
    const response = await api.get('/food/shops-with-items');
    return response.data.data.shops;
};

const createShop = async (formData) => {
    const response = await api.post('/food/shops', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const deleteShop = async (id) => {
    const response = await api.delete(`/food/shops/${id}`);
    return response.data;
};

// Items
const getAllItems = async () => {
    const response = await api.get('/food/items');
    return response.data.data.items;
};

const getItemsByShop = async (shopId) => {
    const response = await api.get(`/food/shops/${shopId}/items`);
    return response.data.data.items;
};

const createItem = async (formData) => {
    const response = await api.post('/food/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const deleteItem = async (id) => {
    const response = await api.delete(`/food/items/${id}`);
    return response.data;
};

export default {
    getAllShops,
    getShopsWithItems,
    createShop,
    deleteShop,
    getAllItems,
    getItemsByShop,
    createItem,
    deleteItem,
};
