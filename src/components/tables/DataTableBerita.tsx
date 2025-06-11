// src/pages/BeritaTable.tsx

import React, { useEffect, useState } from "react";
import { Berita } from "../../api/types/berita";
import { getBerita } from "../../api/services/beritaService";
import DataTable from "./ReusableTables/BasicTableOne";
import {ColumnConfig } from "./ReusableTables/BasicTableOne";

const BeritaTable: React.FC = () => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBerita();
        setBerita(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const columns: ColumnConfig<Berita>[] = [
  {
    header: "Judul",
    accessor: "judul",
  },
  {
    header: "Deskripsi",
    accessor: "deskripsi",
  },
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
      <DataTable<Berita> data={berita} columns={columns} />
    </div>
  );
};

export default BeritaTable;
