import api from '../lib/axios';
import { Berita } from '../types/berita';

export const getBerita = async (): Promise<Berita[]> => {
  try {
    const response = await api.get('/api/berita');
    return response.data.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || "Terjadi kesalahan";
    throw new Error(errMsg);
  }

};

// createBerita menerima FormData
export const createBerita = async (data: FormData) => {
  try {
    const response = await api.post("/api/berita", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || "Gagal membuat berita";
    throw new Error(errMsg);
  }
};


// updateBerita juga menerima FormData
export const updateBerita = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`/api/berita/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}

};


// Delete pengajian
export const deleteBerita = async (id: number) => {
  try {
    const response = await api.delete(`/api/berita/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}

};

export const getBeritaById = async (id: number): Promise<Berita | undefined> => {
  try {
    const response = await api.get("/api/berita"); // Ambil semua data
    const allData: Berita[] = response.data.data;

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

