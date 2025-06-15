import api from '../lib/axios';
import { Laporan } from '../types/laporan';
import { LaporanPenduduk } from '../types/laporanpenduduk';

export const getLaporan = async (): Promise<LaporanPenduduk[]> => {
  try {
    const response = await api.get('/api/laporan');
    return response.data;
  } catch (error) {
    throw new Error('Gagal mengambil data laporan');
  }
};


export const createLaporan = async (data: Omit<Laporan, "id" | "created_at" | "updated_at" | "bulan_tahun">) => {
  const response = await api.post("/api/laporanmanual", data);
  return response.data;
};

// Update laporan
export const updateLaporan = async (
  id: number,
  data: Omit<Laporan, "id" | "created_at" | "updated_at" | "bulan_tahun">
) => {
  try {
    const response = await api.put(`/api/laporanmanual/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal memperbarui data laporan");
  }
};

// Delete laporan
export const deleteLaporan = async (id: number) => {
  try {
    const response = await api.delete(`/api/laporanmanual/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus data laporan");
  }
};

export const getLaporanById = async (id: number): Promise<Laporan | undefined> => {
  try {
    const response = await api.get("/api/laporanmanual"); // Ambil semua data
    const allData: Laporan[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error) {
    throw new Error("Gagal mengambil data Laporan berdasarkan ID");
  }
};
