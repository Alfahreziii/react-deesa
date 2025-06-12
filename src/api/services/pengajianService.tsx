// api/services/berita.service.ts
import api from '../lib/axios';
import { Pengajian } from '../types/pengajian';

export const getPengajian = async (): Promise<Pengajian[]> => {
  try {
    const response = await api.get('/api/pengajian');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Pengajian');
  }
};

export const createPengajian = async (data: Omit<Pengajian, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/pengajian", data);
  return response.data;
};

// Update pengajian
export const updatePengajian = async (
  id: number,
  data: Omit<Pengajian, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/pengajian/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data Pengajian");
  }
};

// Delete pengajian
export const deletePengajian = async (id: number) => {
  try {
    const response = await api.delete(`/api/pengajian/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data Pengajian");
  }
};
