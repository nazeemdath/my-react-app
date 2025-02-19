import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth"; // Django backend URL

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
        return response.data; // Returns JWT tokens
    } catch (error) {
        console.error("Login error:", error.response?.data);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register/`, userData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data);
        throw error;
    }
};
