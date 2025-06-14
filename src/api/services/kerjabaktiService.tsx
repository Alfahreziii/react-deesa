import api from '../lib/axios';
import { Kerjabakti } from '../types/kerjabakti';

export const getKerjabakti = async (): Promise<Kerjabakti[]> => {
  try {
    const response = await api.get('/api/kerjabakti');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Kerja Bakti');
  }
};

export const createKerjabakti = async (data: Omit<Kerjabakti, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/kerjabakti", data);
  return response.data;
};

// Update kerja bakti
export const updateKerjabakti = async (
  id: number,
  data: Omit<Kerjabakti, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/kerjabakti/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data Kerja Bakti");
  }
};

// Delete kerja bakti
export const deleteKerjabakti = async (id: number) => {
  try {
    const response = await api.delete(`/api/kerjabakti/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data Kerja Bakti");
  }
};

export const getKerjabaktiById = async (id: number): Promise<Kerjabakti | undefined> => {
  try {
    const response = await api.get("/api/kerjabakti"); // Ambil semua data
    const allData: Kerjabakti[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error) {
    throw new Error("Gagal mengambil data Kerja Bakti berdasarkan ID");
  }
};
