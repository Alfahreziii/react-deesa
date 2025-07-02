import api from '../lib/axios';
import { Jabatan } from '../types/jabatan';

export const getJabatan = async (): Promise<Jabatan[]> => {
  try {
    const response = await api.get('/api/jabatan');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const createJabatan = async (data: Omit<Jabatan, "id" | "created_at" | "updated_at">) => {
  try{
    const response = await api.post("/api/jabatan", data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const deleteJabatan = async (id: number) => {
  try {
    const response = await api.delete(`/api/jabatan/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};