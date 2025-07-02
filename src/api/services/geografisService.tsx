import api from '../lib/axios';
import { Geografis } from '../types/geografis';

export const getGeografis = async (): Promise<Geografis[]> => {
  try {
    const response = await api.get('/api/geografis');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// createGeografis menerima FormData
export const createGeografis = async (data: FormData) => {
    try{
        const response = await api.post("/api/geografis", data, {
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

// updateGeografis juga menerima FormData
export const updateGeografis = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`/api/geografis/${id}`, data, {
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


// Delete geografis
export const deleteGeografis = async (id: number) => {
  try {
    const response = await api.delete(`/api/geografis/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getGeografisById = async (id: number): Promise<Geografis | undefined> => {
  try {
    const response = await api.get("/api/geografis"); // Ambil semua data
    const allData: Geografis[] = response.data.data;

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

