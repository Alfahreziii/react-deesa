import api from '../lib/axios';
import { Iuran } from '../types/iuran';
import { Pembayaran } from '../types/pembayaran';

export const getPembayaran = async (): Promise<Pembayaran[]> => {
  try {
    const response = await api.get('/api/pembayaran');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getPembayaranById = async (id: number): Promise<Pembayaran | undefined> => {
  try {
    const response = await api.get("/api/pembayaran"); // Ambil semua data
    const allData: Pembayaran[] = response.data.data;

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

export const createPembayaran = async (data: Omit<Pembayaran, "id" | "created_at" | "updated_at" | "order_id" | "nama_user" | "email_user" | "bulan_iuran" | "harga_iuran">) => {
  try{
    const response = await api.post("/api/pembayaran", data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete pembayaran
export const deletePembayaran = async (id: number) => {
  try {
    const response = await api.delete(`/api/pembayaran/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getIuran = async (): Promise<Iuran[]> => {
  try {
    const response = await api.get('/api/iuran');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};


export const createIuran = async (data: Omit<Iuran, "id" | "created_at" | "updated_at">) => {
  const response = await api.post("/api/iuran", data);
  return response.data;
};

// Update iuran
export const updateIuran = async (
  id: number,
  data: Omit<Iuran, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await api.put(`/api/iuran/${id}`, data);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Delete iuran
export const deleteIuran = async (id: number) => {
  try {
    const response = await api.delete(`/api/iuran/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getIuranById = async (id: number): Promise<Iuran | undefined> => {
  try {
    const response = await api.get("/api/iuran"); // Ambil semua data
    const allData: Iuran[] = response.data.data;

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
