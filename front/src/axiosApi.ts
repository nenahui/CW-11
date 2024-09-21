import { API_URL } from '@/consts.ts';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: API_URL,
});
