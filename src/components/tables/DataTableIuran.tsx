import React, { useEffect, useState } from "react";
import { Iuran } from "../../api/types/iuran";
import {
  getIuran,
  deleteIuran,
} from "../../api/services/iuranService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const IuranTable: React.FC = () => {
  const [iuran, setIuran] = useState<Iuran[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getIuran();
      setIuran(data);
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
      await deleteIuran(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/iuran-tables/edit-iuran/${id}`);
  };
  const handleDetail = (id: number) => {
    navigate(`/iuran-tables/detail-iuran/${id}`);
  };

  const columns: ColumnConfig<Iuran>[] = [
    {
      header: "Bulan",
      accessor: "bulan",
      render: (value: string) => value.slice(0, 7), 
    },
    {
    header: "Harga",
    accessor: "harga",
    render: (value: number) =>
        value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        }),
    },
    {
    header: "Jatuh Tempo",
    accessor: "jatuh_tempo",
    render: (value: string) =>
        new Date(value).toLocaleDateString("id-ID", {
        dateStyle: "long",
        }),
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
      render: (_value: any, row: Iuran) => (
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
      <DataTable<Iuran>
        data={iuran}
        columns={columns}
        createLink="/form-iuran"
      />
    </div>
  );
};

export default IuranTable;
