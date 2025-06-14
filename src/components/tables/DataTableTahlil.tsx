import React, { useEffect, useState } from "react";
import { Tahlil } from "../../api/types/tahlil";
import {
  getTahlil,
  deleteTahlil,
} from "../../api/services/tahlilService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { formatHari } from "../../utils/dateFormatter";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const TahlilTable: React.FC = () => {
  const [tahlil, setTahlil] = useState<Tahlil[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTahlil();
      setTahlil(data);
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
      await deleteTahlil(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/tahlil-tables/edit-tahlil/${id}`);
  };

  const columns: ColumnConfig<Tahlil>[] = [
    {
      header: "Hari",
      accessor: "hari",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Jam",
      accessor: "jam_mulai",
      render: (_value: string, row: Tahlil) =>
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
      render: (_value: any, row: Tahlil) => (
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
      <DataTable<Tahlil>
        data={tahlil}
        columns={columns}
        createLink="/form-tahlil"
      />
    </div>
  );
};

export default TahlilTable;
