import api from '../lib/axios';
import { Surat } from '../types/surat';

export const getSurat = async (): Promise<Surat[]> => {
  try {
    const response = await api.get('/api/surat');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Surat');
  }
};

// Delete surat
export const deleteSurat = async (id: number) => {
  try {
    const response = await api.delete(`/api/surat/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data surat");
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
  } catch (error) {
    throw new Error("Gagal mengambil data surat berdasarkan ID");
  }
};
