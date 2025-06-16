import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSuratById } from "../../api/services/suratService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SuratFormComponent from "../../components/form/form-elements/SuratInputs.tsx";

export default function DetailLaporanPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSuratById(Number(id));
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
      <PageBreadcrumb pageTitle="Detail Surat" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <SuratFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}