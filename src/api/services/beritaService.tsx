// api/services/berita.service.ts
import api from '../lib/axios';
import { Berita } from '../types/berita';

export const getBerita = async (): Promise<Berita[]> => {
  try {
    const response = await api.get('/api/berita');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data berita');
  }
};
