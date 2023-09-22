import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38571599-d8bb1b9f57ff42e3a0ab2e61e';

// Створимо екземпляр axios з базовою конфігурацією
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

export const getPhotosService = async (value, page) => {
  try {
    const { data } = await api.get('', {
      params: {
        q: value,
        page,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
