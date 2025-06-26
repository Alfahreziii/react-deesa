import React, { useEffect, useState } from "react";
import { Pembayaran } from "../../api/types/pembayaran";
import {
  getPembayaran,
  deletePembayaran
} from "../../api/services/iuranService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

const PembayaranTable: React.FC = () => {
  const [pembayaran, setPembayaran] = useState<Pembayaran[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPembayaran();
      setPembayaran(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const handleDetail = (id: number) => {
    navigate(`/pembayaran-tables/detail-pembayaran/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirmAlert(
      "Yakin ingin menghapus?",
      "Tindakan ini tidak bisa dibatalkan!"
    );
  
    if (confirmed) {
      try {
        await deletePembayaran(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData(); // refresh data setelah delete
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };

  const columns: ColumnConfig<Pembayaran>[] = [
    {
      header: "Nama",
      accessor: "nama_user",
    },
    {
      header: "Bulan",
      accessor: "bulan_iuran",
    },
    {
    header: "Harga",
    accessor: "harga_iuran",
    render: (value: number) =>
        value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        }),
    },
    {
    header: "Order ID",
    accessor: "order_id",
    },
    {
    header: "Status",
    accessor: "status",
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (_value: any, row: Pembayaran) => (
        <div className="flex gap-2">
            <button
            onClick={() => handleDetail(row.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Detail
          </button>
                    <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <DataTable<Pembayaran>
        data={pembayaran}
        columns={columns}
        createLink="/form-pembayaran"
      />
    </div>
  );
};

export default PembayaranTable;
