import React, { useEffect, useState } from "react";
import { Pengajian } from "../../api/types/pengajian";
import {
  getPengajian,
  deletePengajian,
} from "../../api/services/pengajianService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { formatHari } from "../../utils/dateFormatter";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const PengajianTable: React.FC = () => {
  const [pengajian, setPengajian] = useState<Pengajian[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPengajian();
      setPengajian(data);
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
      await deletePengajian(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/pengajian-tables/edit-pengajian/${id}`);
  };
  const handleDetail = (id: number) => {
    navigate(`/pengajian-tables/detail-pengajian/${id}`);
  };

  const columns: ColumnConfig<Pengajian>[] = [
    {
      header: "Judul",
      accessor: "judul",
    },
    {
      header: "Hari",
      accessor: "hari",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Jam",
      accessor: "jam_mulai",
      render: (_value: string, row: Pengajian) =>
        `${row.jam_mulai} - ${row.jam_selesai}`,
    },
    {
      header: "Tempat",
      accessor: "tempat",
    },
    {
      header: "Ustadzah",
      accessor: "ustadzah",
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
      render: (_value: any, row: Pengajian) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
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
      <DataTable<Pengajian>
        data={pengajian}
        columns={columns}
        createLink="/form-pengajian"
      />
    </div>
  );
};

export default PengajianTable;
