import React, { useEffect, useState } from "react";
import { Rapat } from "../../api/types/rapat";
import {
  getRapat,
  deleteRapat,
} from "../../api/services/rapatService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { formatHari } from "../../utils/dateFormatter";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const RapatTable: React.FC = () => {
  const [rapat, setRapat] = useState<Rapat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRapat();
      setRapat(data);
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
      await deleteRapat(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/rapat-tables/edit-rapat/${id}`);
  };
  const handleDetail = (id: number) => {
    navigate(`/rapat-tables/edit-rapat/${id}`);
  };

  const columns: ColumnConfig<Rapat>[] = [
    {
      header: "Hari",
      accessor: "hari",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Jam",
      accessor: "jam_mulai",
      render: (_value: string, row: Rapat) =>
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
      header: "Bahasan",
      accessor: "bahasan",
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
      render: (_value: any, row: Rapat) => (
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
      <DataTable<Rapat>
        data={rapat}
        columns={columns}
        createLink="/form-rapat"
      />
    </div>
  );
};

export default RapatTable;
