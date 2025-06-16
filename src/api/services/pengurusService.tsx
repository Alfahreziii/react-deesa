import api from '../lib/axios';
import { Pengurus } from '../types/pengurus';

export const getPengurus = async (): Promise<Pengurus[]> => {
  try {
    const response = await api.get('/api/pengurus');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data pengurus');
  }
};

// pengurus menerima FormData
export const createPengurus = async (data: FormData) => {
  const response = await api.post("/api/pengurus", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// pengurus juga menerima FormData
export const updatePengurus = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`/api/pengurus/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data Pengajian");
  }
};


// Delete pengajian
export const deletePengurus = async (id: number) => {
  try {
    const response = await api.delete(`/api/pengurus/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data Pengajian");
  }
};

export const getPengurusById = async (id: number): Promise<Pengurus | undefined> => {
  try {
    const response = await api.get("/api/pengurus"); // Ambil semua data
    const allData: Pengurus[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error) {
    throw new Error("Gagal mengambil data Pengajian berdasarkan ID");
  }
};

