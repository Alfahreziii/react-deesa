import api from '../lib/axios';
import { Tahlil } from '../types/tahlil';

export const getTahlil = async (): Promise<Tahlil[]> => {
  try {
    const response = await api.get('/api/tahlil');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Tahlil');
  }
};

export const createTahlil = async (data: Omit<Tahlil, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/tahlil", data);
  return response.data;
};

// Update tahlil
export const updateTahlil = async (
  id: number,
  data: Omit<Tahlil, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/tahlil/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data Tahlil");
  }
};

// Delete tahlil
export const deleteTahlil = async (id: number) => {
  try {
    const response = await api.delete(`/api/tahlil/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data Tahlil");
  }
};

export const getTahlilById = async (id: number): Promise<Tahlil | undefined> => {
  try {
    const response = await api.get("/api/tahlil"); // Ambil semua data
    const allData: Tahlil[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error) {
    throw new Error("Gagal mengambil data Tahlil berdasarkan ID");
  }
};
