import axios from 'axios';
import {MAIN_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL || 'https://your-default-api.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptors
    this.api.interceptors.request.use(
      config => {
        // Add the Authorization header if the token exists
        const token = this.getToken(); // Retrieve token from a function or state
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', config);
        return config;
      },
      error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      response => {
        console.log('Response:', response);
        return response.data;
      },
      error => {
        console.error('Response Error:', error);
        return Promise.reject(error.response || error.message);
      },
    );
  }

  /**
   * Function to get the token (implement your logic here)
   * Example: Retrieve it from local storage, Redux store, or a global variable
   */
  async getToken() {
    // Replace this with your token retrieval logic
    return (await AsyncStorage.getItem('authToken')) || null;
  }

  async get(endpoint, params = {}) {
    try {
      return await this.api.get(endpoint, {params});
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, data = {}) {
    try {
      return await this.api.post(endpoint, data);
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint, data = {}) {
    try {
      return await this.api.put(endpoint, data);
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint, params = {}) {
    try {
      return await this.api.delete(endpoint, {params});
    } catch (error) {
      throw error;
    }
  }
}

// Export an instance of the service with a base URL
export const apiService = new ApiService(MAIN_URL);
