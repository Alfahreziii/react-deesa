import api from '../lib/axios';
import { JenisSurat } from '../types/jenissurat';

export const getJenisSurat = async (): Promise<JenisSurat[]> => {
  try {
    const response = await api.get('/api/jenissurat');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Jenis Surat');
  }
};

export const createJenisSurat = async (data: Omit<JenisSurat, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/jenissurat", data);
  return response.data;
};

// Delete jenis surat
export const deleteJenisSurat = async (id: number) => {
  try {
    const response = await api.delete(`/api/jenissurat/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data jenis surat");
  }
};