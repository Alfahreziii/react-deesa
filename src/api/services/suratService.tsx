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

export const createSurat = async (data: Omit<Surat, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/surat", data);
  return response.data;
};

// Update surat
export const updateSurat = async (
  id: number,
  data: Omit<Surat, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/surat/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data surat");
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
