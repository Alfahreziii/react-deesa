import api from '../lib/axios';
import { Aduan } from '../types/aduan';

export const getAduan = async (): Promise<Aduan[]> => {
  try {
    const response = await api.get('/api/Aduan');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete Aduand
export const deleteAduan = async (id: number) => {
  try {
    const response = await api.delete(`/api/aduan/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

