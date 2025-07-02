import api from '../lib/axios';
import { Pengajian } from '../types/pengajian';

export const getPengajian = async (): Promise<Pengajian[]> => {
  try {
    const response = await api.get('/api/pengajian');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const createPengajian = async (data: Omit<Pengajian, "id" | "created_at" | "updated_at">) => {
  try{
    const response = await api.post("/api/pengajian", data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Update pengajian
export const updatePengajian = async (
  id: number,
  data: Omit<Pengajian, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/pengajian/${id}`, data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete pengajian
export const deletePengajian = async (id: number) => {
  try {
    const response = await api.delete(`/api/pengajian/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getPengajianById = async (id: number): Promise<Pengajian | undefined> => {
  try {
    const response = await api.get("/api/pengajian"); // Ambil semua data
    const allData: Pengajian[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};
