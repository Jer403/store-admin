import axios from "./axios.ts";

export const createProductRequest = async (formData: FormData) => {
  return await axios.post(`/product`, formData);
};
