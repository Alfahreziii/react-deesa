import { useEffect, useState } from "react";
import api from '../../api/lib/axios';

declare global {
  interface Window {
    snap: any;
  }
}

export default function IuranPage() {
  const [loading, setLoading] = useState(false);

  const handleBayar = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/payment/create");
      const snapToken = res.data.snapToken;

      window.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          alert("Pembayaran berhasil!");
          console.log(result);
        },
        onPending: (result: any) => {
          alert("Pembayaran pending!");
        },
        onError: (result: any) => {
          alert("Pembayaran gagal!");
          console.error(result);
        },
        onClose: () => {
          alert("Anda menutup popup pembayaran.");
        },
      });
    } catch (error) {
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Iuran Bulan Juni 2025</h2>
      <p>Harga: Rp50.000</p>
      <button
        onClick={handleBayar}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>
    </div>
  );
}
