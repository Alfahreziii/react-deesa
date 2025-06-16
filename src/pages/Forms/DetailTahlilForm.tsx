import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTahlilById } from "../../api/services/tahlilService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TahlilFormComponent from "../../components/form/form-elements/TahlilInputs.tsx";

export default function DetailLaporanPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTahlilById(Number(id));
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
      <PageBreadcrumb pageTitle="Detail Tahlil" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <TahlilFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}