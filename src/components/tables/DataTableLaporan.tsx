import React, { useEffect, useState } from "react";
import { LaporanPenduduk } from "../../api/types/laporanpenduduk";
import {
  getLaporan,
} from "../../api/services/laporanService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";

const LaporanTable: React.FC = () => {
  const [laporanpenduduk, setLaporanpenduduk] = useState<LaporanPenduduk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLaporan();
      setLaporanpenduduk(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (id: number) => {
    navigate(`/laporan-tables/edit-laporan/${id}`);
  };

  const columns: ColumnConfig<LaporanPenduduk>[] = [
    {
      header: "Tanggal Laporan",
      accessor: "tanggal_laporan",
      className: "max-w-[250px] truncate",
      render: (value: string) => value.slice(0, 7), // hanya ambil YYYY-MM
    },
    {
      header: "Jumlah Rumah",
      accessor: "jumlah_rumah",
    },
    {
      header: "Jumlah KK",
      accessor: "jumlah_kk",
    },
    {
      header: "Jumlah Laki",
      accessor: "jumlah_laki",
    },
    {
      header: "Jumlah Perempuan",
      accessor: "jumlah_perempuan",
    },
    {
      header: "Jumlah Meninggal",
      accessor: "jumlah_meninggal",
    },
    {
      header: "Jumlah Lahir",
      accessor: "jumlah_lahir",
    },
    {
      header: "Jumlah Pindah",
      accessor: "jumlah_pindah",
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (_value: any, row: LaporanPenduduk) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <DataTable<LaporanPenduduk>
        data={laporanpenduduk ?? []}
        columns={columns}
        createLink="/form-laporan"
      />
    </div>
  );
};

export default LaporanTable;
