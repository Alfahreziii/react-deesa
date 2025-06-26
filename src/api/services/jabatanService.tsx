import api from '../lib/axios';
import { Jabatan } from '../types/jabatan';

export const getJabatan = async (): Promise<Jabatan[]> => {
  try {
    const response = await api.get('/api/jabatan');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Jenis Surat');
  }
};

export const createJabatan = async (data: Omit<Jabatan, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/jabatan", data);
  return response.data;
};

export const deleteJabatan = async (id: number) => {
  try {
    const response = await api.delete(`/api/jabatan/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data jenis surat");
  }
};