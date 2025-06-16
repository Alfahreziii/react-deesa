import api from '../lib/axios';

export const getTotalPenduduk = async () => {
  const response = await api.get('/api/penduduk/count');
  return response.data; // { count: number }
};

export const getTotalPengurus = async () => {
  const response = await api.get('/api/pengurus/count');
  return response.data; // { count: number }
};