import api from '../lib/axios';
import { Aduan } from '../types/aduan';

export const getAduan = async (): Promise<Aduan[]> => {
  try {
    const response = await api.get('/api/Aduan');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Aduan');
  }
};

// Delete Aduand
export const deleteAduan = async (id: number) => {
  try {
    const response = await api.delete(`/api/aduan/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data Aduan");
  }
};

