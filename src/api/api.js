import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
};

export const getProductsByCategory = async (category) => {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
    });
    return response.data;
};