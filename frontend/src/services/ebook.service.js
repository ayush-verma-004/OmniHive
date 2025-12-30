import api from './api';

const getAllEbooks = async () => {
    const response = await api.get('/ebooks');
    return response.data.data.ebooks;
};

const createEbook = async (formData) => {
    const response = await api.post('/ebooks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const deleteEbook = async (id) => {
    const response = await api.delete(`/ebooks/${id}`);
    return response.data;
};

const trackClick = async (id) => {
    const response = await api.get(`/ebooks/track/${id}`);
    return response.data;
};

export default {
    getAllEbooks,
    createEbook,
    deleteEbook,
    trackClick
};
