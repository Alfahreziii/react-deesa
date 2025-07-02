import api from '../lib/axios';
import { Penduduk } from '../types/penduduk';

export const getPenduduk = async (): Promise<Penduduk[]> => {
  try {
    const response = await api.get('/api/penduduk');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const createPenduduk = async (data: Omit<Penduduk, "id" | "created_at" | "updated_at">) => {
  try{
    const response = await api.post("/api/penduduk", data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Update Penduduk
export const updatePenduduk = async (
  id: number,
  data: Omit<Penduduk, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/penduduk/${id}`, data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete Penduduk
export const deletePenduduk = async (id: number) => {
  try {
    const response = await api.delete(`/api/penduduk/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getPendudukById = async (id: number): Promise<Penduduk | undefined> => {
  try {
    const response = await api.get("/api/penduduk"); // Ambil semua data
    const allData: Penduduk[] = response.data.data;

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
