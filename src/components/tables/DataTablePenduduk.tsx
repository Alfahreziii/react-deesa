import React, { useEffect, useState } from "react";
import { Penduduk } from "../../api/types/penduduk";
import {
  getPenduduk,
  deletePenduduk,
} from "../../api/services/pendudukService";
import { formatHari } from "../../utils/dateFormatter";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu


const PendudukTable: React.FC = () => {
  const [penduduk, setPenduduk] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPenduduk();
      setPenduduk(data);
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
      await deletePenduduk(id);
      showAlert("Berhasil", "Data berhasil dihapus", "success");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      showAlert("Gagal", "Gagal menghapus data", "error");
    }
  }
};


  const handleEdit = (id: number) => {
    navigate(`/penduduk-tables/edit-penduduk/${id}`);
  };

  const handleDetail = (id: number) => {
    navigate(`/penduduk-tables/detail-penduduk/${id}`);
  };


  const columns: ColumnConfig<Penduduk>[] = [
    {
      header: "Nama",
      accessor: "nama",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Nomor NIK",
      accessor: "nomor_nik",
    },
    {
      header: "Nomor KK",
      accessor: "nomor_kk",
    },
    {
      header: "Jenis Kelamin",
      accessor: "jenis_kelamin",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Tempat Lahir",
      accessor: "tempat_lahir",
    },
    {
      header: "Tanggal Lahir",
      accessor: "tgl_lahir",
      className: "max-w-[250px] truncate",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Umur",
      accessor: "umur",
    },
    {
      header: "Pekerjaan",
      accessor: "pekerjaan",
    },
    {
      header: "Alamat",
      accessor: "alamat",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Dibuat Pada",
      accessor: "created_at",
      className: "max-w-[250px] truncate",
      render: (value: string) =>
        new Date(value).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (_value: any, row: Penduduk) => (
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
      <DataTable<Penduduk>
        data={penduduk}
        columns={columns}
        createLink="/form-penduduk"
      />
    </div>
  );
};

export default PendudukTable;
