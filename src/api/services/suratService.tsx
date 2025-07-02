import api from '../lib/axios';
import { Surat } from '../types/surat';

export const getSurat = async (): Promise<Surat[]> => {
  try {
    const response = await api.get('/api/surat');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete surat
export const deleteSurat = async (id: number) => {
  try {
    const response = await api.delete(`/api/surat/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getSuratById = async (id: number): Promise<Surat | undefined> => {
  try {
    const response = await api.get("/api/surat"); // Ambil semua data
    const allData: Surat[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};
