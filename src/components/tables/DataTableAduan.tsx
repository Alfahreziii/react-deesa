import React, { useEffect, useState } from "react";
import { Aduan } from "../../api/types/aduan";
import { 
  getAduan,
  deleteAduan,
} from "../../api/services/aduanService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

const AduanTable: React.FC = () => {
  const [aduan, setAduan] = useState<Aduan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAduan();
      setAduan(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirmAlert(
      "Yakin ingin menghapus?",
      "Tindakan ini tidak bisa dibatalkan!"
    );
  
    if (confirmed) {
      try {
        await deleteAduan(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData(); // refresh data setelah delete
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };

const columns: ColumnConfig<Aduan>[] = [
    {
    header: "Foto",
    accessor: "foto",
    render: (value: string) => (
      <img
        src={`${import.meta.env.VITE_API_URL}/file/${value}`}
        alt="Foto"
        className="w-16 h-16 object-cover rounded"
      />
    ),
  },
  {
    header: "Judul",
    accessor: "judul",
  },
  {
    header: "Keterangan",
    accessor: "keterangan",
  },
  {
    header: "Dibuat Pada",
    accessor: "created_at",
    render: (value: string) =>
      new Date(value).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
  },
      {
        header: "Aksi",
        accessor: "id",
        render: (_value: any, row: Aduan) => (
          <div className="flex gap-2">
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
      <DataTable<Aduan> 
        data={aduan} 
        columns={columns} 
      />
    </div>
  );
};

export default AduanTable;
