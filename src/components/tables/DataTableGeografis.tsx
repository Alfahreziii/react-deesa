import React, { useEffect, useState } from "react";
import { Geografis } from "../../api/types/geografis";
import { 
  getGeografis,
  deleteGeografis,
} from "../../api/services/geografisService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

const GeografisTable: React.FC = () => {
  const [geografis, setGeografis] = useState<Geografis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getGeografis();
      setGeografis(data);
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
        await deleteGeografis(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData(); // refresh data setelah delete
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };
  const handleEdit = (id: number) => {
    navigate(`/geografis-tables/edit-geografis/${id}`);
  };

const columns: ColumnConfig<Geografis>[] = [
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
        render: (_value: any, row: Geografis) => (
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
      <DataTable<Geografis> 
        data={geografis} 
        columns={columns} 
        createLink="/form-geografis"
      />
    </div>
  );
};

export default GeografisTable;
