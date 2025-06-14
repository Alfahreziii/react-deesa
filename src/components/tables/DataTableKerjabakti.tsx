import React, { useEffect, useState } from "react";
import { Kerjabakti } from "../../api/types/kerjabakti";
import {
  getKerjabakti,
  deleteKerjabakti,
} from "../../api/services/kerjabaktiService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { formatHari } from "../../utils/dateFormatter";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const KerjabaktiTable: React.FC = () => {
  const [kerjabakti, setKerjabakti] = useState<Kerjabakti[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getKerjabakti();
      setKerjabakti(data);
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
      await deleteKerjabakti(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/kerjabakti-tables/edit-kerjabakti/${id}`);
  };

  const columns: ColumnConfig<Kerjabakti>[] = [
    {
      header: "Hari",
      accessor: "hari",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Jam",
      accessor: "jam_mulai",
      render: (_value: string, row: Kerjabakti) =>
        `${row.jam_mulai} - ${row.jam_selesai}`,
    },
    {
      header: "Tempat",
      accessor: "tempat",
    },
    {
      header: "Peserta",
      accessor: "peserta",
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
      render: (_value: any, row: Kerjabakti) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
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
      <DataTable<Kerjabakti>
        data={kerjabakti}
        columns={columns}
        createLink="/form-kerjabakti"
      />
    </div>
  );
};

export default KerjabaktiTable;
