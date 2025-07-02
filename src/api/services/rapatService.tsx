import api from '../lib/axios';
import { Rapat } from '../types/rapat';

export const getRapat = async (): Promise<Rapat[]> => {
  try {
    const response = await api.get('/api/rapat');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const createRapat = async (data: Omit<Rapat, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await api.post("/api/rapat", data);
      return response.data;
    } catch (error: any) {
    const errMsg = error.response?.data?.message || "Gagal membuat Rapat";
    throw new Error(errMsg);
  }
};

// Update kerja bakti
export const updateRapat = async (
  id: number,
  data: Omit<Rapat, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/rapat/${id}`, data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete kerja bakti
export const deleteRapat = async (id: number) => {
  try {
    const response = await api.delete(`/api/rapat/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}

};

export const getRapatById = async (id: number): Promise<Rapat | undefined> => {
  try {
    const response = await api.get("/api/rapat"); // Ambil semua data
    const allData: Rapat[] = response.data.data;

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
