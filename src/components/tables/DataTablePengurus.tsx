import React, { useEffect, useState } from "react";
import { Pengurus } from "../../api/types/pengurus";
import { 
  getPengurus,
  deletePengurus,
} from "../../api/services/pengurusService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

const PengurusTable: React.FC = () => {
  const [pengurus, setPengurus] = useState<Pengurus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPengurus();
      setPengurus(data);
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
        await deletePengurus(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData(); // refresh data setelah delete
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };
  const handleEdit = (id: number) => {
    navigate(`/pengurus-tables/edit-pengurus/${id}`);
  };
  const handleDetail = (id: number) => {
    navigate(`/pengurus-tables/detail-pengurus/${id}`);
  };

const columns: ColumnConfig<Pengurus>[] = [
    {
    header: "Foto",
    accessor: "foto",
    render: (value: string) => (
      <img
        src={`${import.meta.env.VITE_API_URL}/file/${value}`}
        alt="Foto"
        className="w-20 h-20 object-cover rounded max-w-[300px]"
      />
    ),
  },
  {
    header: "Nama",
    accessor: "nama",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Jabatan",
    accessor: "jabatan",
  },
  {
    header: "Alamat",
    accessor: "alamat",
  },
  {
    header: "No HP",
    accessor: "no_hp",
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
        render: (_value: any, row: Pengurus) => (
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
      <DataTable<Pengurus> 
        data={pengurus} 
        columns={columns} 
        createLink="/form-pengurus"
      />
    </div>
  );
};

export default PengurusTable;
