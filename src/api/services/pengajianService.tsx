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
  const response = await api.post("/pengajian", data);
  return response.data;
};