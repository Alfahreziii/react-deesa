import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getLaporanById } from "../../api/services/laporanService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import LaporanFormComponent from "../../components/form/form-elements/LaporanInputs.tsx";

export default function DetailLaporanPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLaporanById(Number(id));
        setInitialData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
        <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Detail Laporan" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <LaporanFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}