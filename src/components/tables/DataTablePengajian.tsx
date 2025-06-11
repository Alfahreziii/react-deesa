import React, { useEffect, useState } from "react";
import { Pengajian } from "../../api/types/pengajian";
import { getPengajian } from "../../api/services/pengajianService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";

const PengajianTable: React.FC = () => {
  const [berita, setPengajian] = useState<Pengajian[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPengajian();
        setPengajian(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const columns: ColumnConfig<Pengajian>[] = [
  {
    header: "Hari",
    accessor: "hari",
  },
  {
    header: "Jam",
    accessor: "jam_mulai", // tetap pakai jam_mulai sebagai accessor
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
];



  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <DataTable<Pengajian> data={berita} columns={columns} />
    </div>
  );
};

export default PengajianTable;
