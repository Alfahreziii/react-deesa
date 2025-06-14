import React, { useEffect, useState } from "react";
import { Surat } from "../../api/types/surat";
import { 
  getSurat,
  deleteSurat,
} from "../../api/services/suratService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

const SuratTable: React.FC = () => {
  const [surat, setSurat] = useState<Surat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getSurat();
      setSurat(data);
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
        await deleteSurat(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData(); // refresh data setelah delete
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };
const columns: ColumnConfig<Surat>[] = [
  {
    header: "Jenis Surat",
    accessor: "id_jenissurat",
  },
  {
    header: "Atas Nama",
    accessor: "atas_nama",
  },
  {
    header: "Ditunjukan",
    accessor: "ditunjukan",
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
        render: (_value: any, row: Surat) => (
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
      <DataTable<Surat> 
        data={surat} 
        columns={columns} 
      />
    </div>
  );
};

export default SuratTable;
