import axios from 'axios';

const API_URL = 'http://localhost:5000/contacts';

// Helper function for error handling
const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        return { success: false, message: error.response.data.message || "An error occurred" };
    } else if (error.request) {
        // The request was made but no response was received
        return { success: false, message: "No response from server" };
    } else {
        // Something happened in setting up the request that triggered an Error
        return { success: false, message: error.message };
    }
};

export const getContacts = async () => {
    try {
        const response = await axios.get(API_URL);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const getContactById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const createContact = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const updateContact = async (id, data, isFormData = false) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};
