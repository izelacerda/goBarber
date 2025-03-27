import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.15.5:3334',
  // baseURL: 'http://localhost:3334',
  baseURL: 'https://appgo.mycare.med.br',
});

export default api;
