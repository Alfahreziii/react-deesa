import api from '../lib/axios';
import { Iuran } from '../types/iuran';
import { Pembayaran } from '../types/pembayaran';

export const getPembayaran = async (): Promise<Pembayaran[]> => {
  try {
    const response = await api.get('/api/pembayaran');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data pembayaran');
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
  } catch (error) {
    throw new Error("Gagal mengambil data Pembayaran berdasarkan ID");
  }
};

export const createPembayaran = async (data: Omit<Pembayaran, "id" | "created_at" | "updated_at" | "order_id" | "nama_user" | "email_user" | "bulan_iuran" | "harga_iuran">) => {
  const response = await api.post("/api/pembayaran", data);
  return response.data;
};

// Delete pembayaran
export const deletePembayaran = async (id: number) => {
  try {
    const response = await api.delete(`/api/pembayaran/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data pembayaran");
  }
};

export const getIuran = async (): Promise<Iuran[]> => {
  try {
    const response = await api.get('/api/iuran');
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil data iuran');
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
  } catch (error) {
    throw new Error("Gagal memperbarui data iuran");
  }
};

// Delete iuran
export const deleteIuran = async (id: number) => {
  try {
    const response = await api.delete(`/api/iuran/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data iuran");
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
  } catch (error) {
    throw new Error("Gagal mengambil data Iuran berdasarkan ID");
  }
};
