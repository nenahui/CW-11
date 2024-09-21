import { API_URL } from '@/consts.ts';
import axios from 'axios';
import { toast } from 'sonner';

export const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const validationErrors = error.response.data.errors;
      const globalError = error.response.data.error;

      if (validationErrors) {
        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key].message);
        });
      }

      if (globalError) {
        toast.error(globalError);
      }
    } else {
      toast.error('An unknown error occurred...');
    }

    return Promise.reject(error);
  }
);
