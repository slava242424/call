import axios from 'axios';

const API_URL = '/api';

// Клієнти
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні клієнтів:', error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні клієнта з ID ${id}:`, error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, clientData);
    return response.data;
  } catch (error) {
    console.error('Помилка при створенні клієнта:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${API_URL}/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Помилка при оновленні клієнта з ID ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при видаленні клієнта з ID ${id}:`, error);
    throw error;
  }
};

// Дзвінки
export const getCalls = async () => {
  try {
    const response = await axios.get(`${API_URL}/calls`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні дзвінків:', error);
    throw error;
  }
};

export const getCallById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/calls/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні дзвінка з ID ${id}:`, error);
    throw error;
  }
};

export const createCall = async (callData) => {
  try {
    const response = await axios.post(`${API_URL}/calls`, callData);
    return response.data;
  } catch (error) {
    console.error('Помилка при створенні дзвінка:', error);
    throw error;
  }
};

export const updateCall = async (id, callData) => {
  try {
    const response = await axios.put(`${API_URL}/calls/${id}`, callData);
    return response.data;
  } catch (error) {
    console.error(`Помилка при оновленні дзвінка з ID ${id}:`, error);
    throw error;
  }
};

export const deleteCall = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/calls/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при видаленні дзвінка з ID ${id}:`, error);
    throw error;
  }
};

// Запити
export const getRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/requests`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні запитів:', error);
    throw error;
  }
};

export const getRequestById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при отриманні запиту з ID ${id}:`, error);
    throw error;
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await axios.post(`${API_URL}/requests`, requestData);
    return response.data;
  } catch (error) {
    console.error('Помилка при створенні запиту:', error);
    throw error;
  }
};

export const updateRequest = async (id, requestData) => {
  try {
    const response = await axios.put(`${API_URL}/requests/${id}`, requestData);
    return response.data;
  } catch (error) {
    console.error(`Помилка при оновленні запиту з ID ${id}:`, error);
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при видаленні запиту з ID ${id}:`, error);
    throw error;
  }
};