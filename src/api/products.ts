import axios from "./axios.ts";

export const createProductRequest = async (formData: FormData) => {
  return await axios.post(`/product`, formData);
};

export const getAllProductsRequest = async () => {
  return await axios.get(`/product`);
};

export const getUsersRequest = async () => {
  return await axios.get(`/product`);
};
