import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response;
  } catch (error) {}
};

export const getSingleProduct = async (id: string) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log('response', response);
    return response;
  } catch (error) {}
};
