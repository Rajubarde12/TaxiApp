import axios from 'axios';
import Toast from 'react-native-simple-toast';
const apiRequest = async (url, method, data = null) => {
  try {
    const config = {
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data ? JSON.stringify(data) : null,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    Toast.show('Something went wrong');
    throw error;
  }
};
export const apiGet = url => {
  return apiRequest(url, 'get');
};

// POST Request
export const apiPost = (url, data) => {
  return apiRequest(url, 'post', data);
};

// PUT Request
export const apiPut = (url, data) => {
  return apiRequest(url, 'put', data);
};

// DELETE Request
export const apiDelete = url => {
  return apiRequest(url, 'delete');
};
