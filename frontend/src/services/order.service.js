import api from './api';

const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

const getAllOrders = async () => {
    const response = await api.get('/orders');
    return response.data.data.orders;
};

const updateOrderStatus = async (id, status) => {
    const response = await api.patch(`/orders/${id}`, { status });
    return response.data;
};

const deleteOrder = async (id) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
};

export default {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
};
