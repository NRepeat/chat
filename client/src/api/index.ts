import axios from 'axios';
import { Manager } from 'socket.io-client';
const manager = new Manager(import.meta.env.VITE_PUBLIC_API_URL);

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

export const chatSocket = manager.socket('/');
