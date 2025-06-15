export interface Penduduk {
  id: number;
  alamat: string;
  status: string;
  nomor_kk?: string | null;
  nomor_nik?: string | null;
  nama: string;
  jenis_kelamin?: "Laki-laki" | "Perempuan" | null;
  tempat_lahir?: string | null;
  tgl_lahir?: string | null;
  umur?: number | null;
  pekerjaan?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}