import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPendudukById } from "../../api/services/pendudukService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PendudukFormComponent from "../../components/form/form-elements/PendudukInputs.tsx";

export default function EditPendudukPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPendudukById(Number(id));
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
      <PageBreadcrumb pageTitle="Detail Penduduk" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <PendudukFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}