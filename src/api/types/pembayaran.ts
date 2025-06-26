export interface Pembayaran {
  id: number;
  user_id: number;
  iuran_id: number;
  order_id: string;
  status: string,
  paid_at: string;
  nama_user: string;
  email_user: string;
  bulan_iuran: string;
  harga_iuran: number;
}