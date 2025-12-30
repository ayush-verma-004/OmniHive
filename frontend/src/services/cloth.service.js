import api from './api';

const getAllClothes = async () => {
    const response = await api.get('/clothes');
    return response.data.data.clothes;
};

const createCloth = async (formData) => {
    const response = await api.post('/clothes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const deleteCloth = async (id) => {
    const response = await api.delete(`/clothes/${id}`);
    return response.data;
};

export default {
    getAllClothes,
    createCloth,
    deleteCloth,
};
